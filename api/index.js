import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { corsOptions, session } from './config.js'
import { routerUser } from './routes/rUsers.js'

const app = express()

app.disable('x-powered-by')
app.use(express.json())
app.use(cookieParser())
app.use(cors(corsOptions))
app.use(session)

app.use('/', routerUser)
// Port asignament
const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`Server listening on Port :${PORT}`)
})
