const express = require('express');
const Stripe = require('stripe');
const { Queue } = require('bullmq');

for (const name of ['STRIPE_SECRET_KEY', 'STRIPE_ISSUING_WEBHOOK_SECRET']) {
  if (!process.env[name]) throw new Error('Missing required environment variable: ' + name);
}
const redisConnection = {
  host: process.env.REDIS_HOST || 'redis',
  port: Number(process.env.REDIS_PORT || 6379),
  maxRetriesPerRequest: null,
};
const queue = new Queue('stripe-issuing-queue', { connection: redisConnection });
const app = express();
const port = Number(process.env.PORT || 8086);
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2025-01-27.acacia' });

app.get('/health', async (_req, res) => {
  try {
    await queue.client;
    res.json({ ok: true, queue: 'connected' });
  } catch (_error) {
    res.status(503).json({ ok: false, queue: 'unavailable' });
  }
});

app.post('/webhooks/issuing', express.raw({ type: 'application/json' }), async (req, res) => {
  const signature = req.headers['stripe-signature'];
  if (typeof signature !== 'string' || !Buffer.isBuffer(req.body)) {
    return res.status(400).json({ error: 'Missing Stripe signature or raw request body.' });
  }
  let event;
  try {
    event = stripe.webhooks.constructEvent(req.body, signature, process.env.STRIPE_ISSUING_WEBHOOK_SECRET);
  } catch (_error) {
    return res.status(400).json({ error: 'Invalid webhook signature.' });
  }
  if (event.type !== 'issuing_transaction.created') {
    return res.json({ received: true, ignored: event.type });
  }
  try {
    await queue.add('issuing-transaction-created', {
      eventId: event.id,
      transaction: event.data.object,
      receivedAt: new Date().toISOString(),
    }, {
      jobId: event.id,
      attempts: 8,
      backoff: { type: 'exponential', delay: 1000 },
      removeOnComplete: { age: 86400, count: 10000 },
      removeOnFail: { age: 604800, count: 20000 },
    });
    return res.status(202).json({ received: true, queued: true, event_id: event.id });
  } catch (error) {
    console.error('[QUEUE_ENQUEUE_FAILED] Stripe event was not acknowledged:', error);
    return res.status(503).json({ error: 'Queue unavailable; retry delivery.' });
  }
});

const server = app.listen(port, () => console.info('Issuing webhook listening on port ' + port));
async function shutdown() {
  server.close();
  await queue.close();
}
process.on('SIGTERM', () => shutdown().finally(() => process.exit(0)));
process.on('SIGINT', () => shutdown().finally(() => process.exit(0)));
