import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { session } from './config.js'
import { routerUser } from './routes/rUsers.js'

const app = express()

app.disable('x-powered-by')
app.use(express.json())
app.use(cookieParser())
const allowedOrigins = ['https://acortador-links-front.vercel.app']
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      // Permitir solicitudes desde los orígenes permitidos o solicitudes sin origen (como las de herramientas de prueba)
      callback(null, true)
    } else {
      // Bloquear solicitudes desde orígenes no permitidos
      callback(new Error('Not allowed by CORS'))
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // Permite enviar cookies en solicitudes
}

app.use(cors(corsOptions))
app.use(session)

app.use('/', routerUser)
// Port asignament
const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`Server listening on Port :${PORT}`)
})
