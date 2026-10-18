import { EventEmitter } from 'node:events';

export type SystemEventSource =
  | 'aurel_inquiry'
  | 'stripe_issuing'
  | 'mindreply_audit';

export interface SystemEvent {
  id: string;
  source: SystemEventSource;
  type: string;
  payload: Record<string, unknown>;
  timestamp: string;
}

type EventListener = (event: SystemEvent) => void;

/**
 * In-process event fan-out for PersonalOS.
 *
 * This bus is intentionally not a durable queue and does not send email or
 * write to a financial index by itself. Production delivery must be provided
 * by explicit adapters (and use a durable queue for events that cannot be lost).
 */
class PersonalOSEventBus extends EventEmitter {
  private static instance: PersonalOSEventBus;

  private constructor() {
    super();
    this.setMaxListeners(50);
  }

  public static getInstance(): PersonalOSEventBus {
    if (!PersonalOSEventBus.instance) {
      PersonalOSEventBus.instance = new PersonalOSEventBus();
    }
    return PersonalOSEventBus.instance;
  }

  public publish(event: SystemEvent): void {
    if (!event.id || !event.type || !event.timestamp) {
      throw new TypeError('SystemEvent requires id, type, and timestamp');
    }

    if (!Number.isFinite(Date.parse(event.timestamp))) {
      throw new TypeError('SystemEvent timestamp must be a valid date');
    }

    // Avoid logging payloads: they may contain applicant or financial data.
    console.info('[A11_BUS] Event received', {
      id: event.id,
      source: event.source,
      type: event.type,
      timestamp: event.timestamp,
    });

    this.emit(event.source, event);
    this.emit('*', event);
  }

  public subscribe(source: SystemEventSource | '*', listener: EventListener): () => void {
    this.on(source, listener);
    return () => this.off(source, listener);
  }
}

export const eventBus = PersonalOSEventBus.getInstance();

// These listeners deliberately report integration state only. They do not
// claim to dispatch email or persist ledger events until real adapters exist.
eventBus.subscribe('aurel_inquiry', (event) => {
  console.info('[NOTIFY_DISPATCH] No SMTP adapter configured; inquiry not emailed', {
    eventId: event.id,
  });
});

eventBus.subscribe('stripe_issuing', (event) => {
  console.info('[FINANCE_AGENT] No durable index adapter configured', {
    eventId: event.id,
  });
});
