import fastify from 'fastify'
import { userRoutes } from './routes/users'
import { env } from './env'
import { authRoutes } from './routes/auth'

const app = fastify()

app.register(userRoutes, { prefix: '/users' })
app.register(authRoutes, { prefix: '/login' })

app.listen({ port: env.PORT, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err)
  }
  console.log(`Server running at \u001b[34m${address}\u001b[0m`)
})
