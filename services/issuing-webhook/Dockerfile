FROM node:20-alpine
WORKDIR /app
COPY services/issuing-webhook/package.json ./package.json
RUN npm install --omit=dev
COPY services/issuing-webhook/index.js ./index.js
COPY services/issuing-webhook/worker.ts ./worker.ts
EXPOSE 8086
CMD ["node", "index.js"]
