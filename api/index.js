import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { session } from './config.js'
import { routerUser } from './routes/rUsers.js'

const app = express()
const allowedOrigins = ['https://acortador-links-front.vercel.app']
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}

// Aplica CORS a todas las rutas
app.use(cors(corsOptions))

// Maneja solicitudes preflight
app.options('*', cors(corsOptions))

app.disable('x-powered-by')
app.use(express.json())
app.use(cookieParser())

app.use(session)

app.use('/', routerUser)
// Port asignament
const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`Server listening on Port :${PORT}`)
})
