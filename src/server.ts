import fastify from 'fastify'
import cookie from '@fastify/cookie'
import { userRoutes } from './routes/users'
import { env } from './env'
import { authRoutes } from './routes/auth'
import { mealsRoutes } from './routes/meals'

const app = fastify()

app.register(cookie)
app.register(userRoutes, { prefix: '/users' })
app.register(mealsRoutes, { prefix: '/meals' })
app.register(authRoutes, { prefix: '/login' })

app.listen({ port: env.PORT, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err)
  }
  console.log(`Server running at \u001b[34m${address}\u001b[0m`)
})
