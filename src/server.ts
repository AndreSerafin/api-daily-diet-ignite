import { app } from './app'

app
  .listen({ host: '0.0.0.0', port: 3333 })
  .then((port) => console.log(`🚀 HTTP server Running at: ${port} `))
