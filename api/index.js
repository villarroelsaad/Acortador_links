import express from 'express'
import mysql from 'mysql2/promise'
import crypto from 'node:crypto'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import cookieParser from 'cookie-parser'
import { Secret } from './config.js'

const app = express()

// Conectar a la base de datos
const connection = await mysql.createConnection({
  host: 'betxwuucvkixjqb9vapw-mysql.services.clever-cloud.com',
  user: 'u7rnrdilogdxm8ks',
  password: '5GfGWtuHc3bo34PbSRUK',
  database: 'betxwuucvkixjqb9vapw'
})
// Jkl90*&*(des
// descargar dependencias para las cookies
app.disable('x-powered-by')
app.use(express.json())
app.use(cookieParser())
app.use(cors({
}))

app.use((req, res, next) => {
  const token = req.cookies.access_token
  req.session = { user: null }

  try {
    const data = jwt.verify(token, Secret)
    req.session.user = data
  } catch { }
  next()
})
app.get('/', (req, res) => {
  document.write('hola')
  res.message('hola')
})
app.post('/url/create', async (req, res) => {
  // recuperar la url
  const { url, id } = req.body
  if (!url) {
    res.status(400).json({ error: 'wrong request' })
  }
  const shorten = crypto.createHash('md5').update(url).digest('hex').toString()
  // obtener primeros caracteres
  const hash = shorten.substring(0, 8)
  // guardar
  if (id) {
    await connection.execute('insert into Url (ShortUrl, OldUrl, UserID_Users) values (?,?,?);', [hash, url, id])
  } else {
    await connection.execute('insert into Url (ShortUrl, OldUrl) values (?,?);', [hash, url])
  }// regresar url shortened
  res.status(201).json({ shortUrl: `${req.headers.host}/${hash}` })
})

app.get('/:hash', async (req, res) => {
  // extraer parametro de la direccion
  const { hash } = req.params
  // buscar en la db
  const [link] = await connection.execute('SELECT OldUrl FROM Url where ShortUrl = ?;', [hash])
  if (link.length > 0) {
    // redirigir
    res.redirect(link[0].OldUrl)
  }
  res.status(404)
})

app.post('/login', async (req, res) => {
  const { username, password } = req.body
  try {
    const [userRows] = await connection.execute('SELECT UserID, Username, Upassword FROM Users WHERE Username = ?', [username])
    if (userRows.length === 0) throw new Error('Username does not exist')
    const user = userRows[0]
    const isValid = await bcrypt.compare(password, user.Upassword)
    const { Upassword: _, ...authUser } = user
    if (isValid) {
      // crear token y guardarlo en las cookies
      const token = jwt.sign({ username: user.Username }, Secret, {
        expiresIn: '1h'
      })
      res.cookie('access_token', token, {
        httpOnly: true
        // other cookie settings
      })
      res.status(200).json({ authUser })
    } else {
      res.status(401).send({ error: 'Invalid password' })
    }
  } catch (error) {
    res.status(401).send({ error: error.message })
  }
})
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body
  console.log(req.body)
  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    await connection.execute('insert into Users (Username, Email,Upassword) values (?,?,?);', [username, email, hashedPassword])
    res.send({ message: 'User create successfully' })
  } catch (error) {
    res.status(400).send({ error })
  }
})
app.get('/links/:id', async (req, res) => {
  const { id } = req.params

  try {
    const [links] = await connection.execute('SELECT id, OldUrl, ShortUrl FROM Url where UserID_Users = ?;', [id])

    if (links.length === '') {
      return res.status(404).json({ message: 'No posee links activos' })
    }
    const formattedLinks = links.map(({ id, OldUrl, ShortUrl }) => ({ id, OldUrl, ShortUrl: `${req.headers.host}/${ShortUrl}` }))
    res.json(formattedLinks)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al obtener los links' })
  }
})
app.delete('/delete/:id', async (req, res) => {
  const { id } = req.params

  try {
    await connection.execute('DELETE FROM Url WHERE id = ?;', [id])
    res.status(204).json({ message: 'Enlace eliminado correctamente' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error al eliminar el enlace' })
  }
})

app.get('/logout', (req, res) => {
  res
    .clearCookie('access_token')
    .json({ message: 'logout successful' })
})
// Port asignament
const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`Server listening on Port :${PORT}`)
})
