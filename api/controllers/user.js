import { Secret } from '../config.js'
import crypto from 'node:crypto'
import jsonwebtoken from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { userModel } from '../models/user.js'
import { validateUser, validateUrl } from '../schemas/user.js'
export class UserController {
    static async home(req, res) {
        // recuperar la url
        res.json({ message: 'Hola' })
    }

    static async createUrl(req, res) {
        // recuperar la url
        const { url, id } = validateUrl(req.body)
        if (!url) {
            res.status(400).json({ error: 'wrong request' })
        }
        const shorten = crypto.createHash('md5').update(url).digest('hex').toString()
        // obtener primeros caracteres
        const hash = shorten.substring(0, 8)
        // guardar
        userModel.createUrl({ hash, url, id })
        res.status(201).json({ shortUrl: `${req.headers.host}/${hash}` })
    }

    static async hash(req, res) {
        // extraer parametro de la direccion
        const { hash } = req.params
        // buscar en la db
        const [link] = userModel.hash({ hash })
        if (link.length > 0) {
            // redirigir
            res.redirect(link[0].OldUrl)
        }
        res.status(404)
    }

    static async login(req, res) {
        const { username, password } = req.body
        try {
            const [userRows] = await userModel.login({ username })
            if (userRows.length === 0) throw new Error('Username does not exist')
            const user = userRows[0]
            const isValid = await bcrypt.compare(password, user.Upassword)
            const { Upassword: _, ...authUser } = user
            if (isValid) {
                // crear token y guardarlo en las cookies
                const token = jsonwebtoken.sign({ username: user.Username }, Secret, {
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
    }

    static async register(req, res) {
        const { username, email, password } = validateUser(req.body)
        console.log(req.body)
        try {
            const hashedPassword = await bcrypt.hash(password, 10)
            userModel.register({ username, email, hashedPassword })
            res.send({ message: 'User create successfully' })
        } catch (error) {
            res.status(400).send({ error })
        }
    }

    static async links(req, res) {
        const { id } = req.params

      try {
          const [links] = await userModel.links({ id })
          if (links.length === '') {
              return res.status(404).json({ message: 'No posee links activos' })
          }
          const formattedLinks = links.map(({ id, OldUrl, ShortUrl }) => ({ id, OldUrl, ShortUrl: `${req.headers.host}/${ShortUrl}` }))
          res.json(formattedLinks)
      } catch (error) {
          console.error(error)
          res.status(500).json({ message: 'Error al obtener los links' })
      }
  }

    static async delete(req, res) {
        const { id } = req.params

      try {
          await userModel.delete(id)
          res.status(204).json({ message: 'Enlace eliminado correctamente' })
      } catch (error) {
          console.error(error)
          res.status(500).json({ message: 'Error al eliminar el enlace' })
      }
  }

    static async logOut(req, res) {
        res
            .clearCookie('access_token')
            .json({ message: 'logout successful' })
    }
}
