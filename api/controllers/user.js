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
    try {
      // Validar la URL recibida
      const result = validateUrl(req.body)
      if (!result) {
        return res.status(400).json({ error: 'Invalid request' })
      }

      // Crear un hash único para la URL
      const hash = crypto.createHash('md5').update(result.data.url).digest('hex').substring(0, 8)

      // Guardar la URL en la base de datos
      await userModel.createUrl({ hash, input: result.data })

      // Enviar una respuesta con la URL corta
      res.status(201).json({ shortUrl: `${req.headers.host}/${hash}` })
    } catch (error) {
      // Manejar errores
      console.error(error)
      res.status(500).json({ error: 'Server error' })
    }
  }

  static async hash(req, res) {
  // extraer parametro de la direccion
    try {
    // Extraer el parámetro de la dirección
      const { hash } = req.params

      // Buscar en la base de datos
      const links = await userModel.hash({ hash })

      if (links.length > 0) {
        // Redirigir si se encuentra el hash
        res.redirect(links[0].OldUrl)
      } else {
        // Enviar un estado 404 si no se encuentra el hash
        res.status(404).send('Not Found')
      }
    } catch (error) {
      // Manejar errores
      console.error(error)
      res.status(500).send('Server Error')
    }
  }

  static async login(req, res) {
    const result = validateUser(req.body)

    if (!result) {
      return res.status(400).json({ error: 'Invalid request data' })
    }

    try {
      // Obtener el usuario de la base de datos
      const [userRows] = await userModel.login({ input: result.data.username })

      if (userRows.length === 0) {
        return res.status(401).json({ error: 'Username does not exist' })
      }

      const user = userRows[0]

      // Comparar la contraseña ingresada con la almacenada
      const isValid = await bcrypt.compare(result.data.password, user.Upassword)

      if (isValid) {
        // Crear el token JWT
        const token = jsonwebtoken.sign({ username: user.Username }, Secret, { expiresIn: '1h' })

        // Configurar la cookie
        res.cookie('access_token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          maxAge: 3600000 // 1 hora en milisegundos
        })

        // Enviar respuesta con el usuario autenticado sin la contraseña
        const { Upassword, ...authUser } = user
        return res.status(200).json({ authUser })
      } else {
        return res.status(401).json({ error: 'Invalid password' })
      }
    } catch (error) {
      console.error('Login error:', error)
      return res.status(500).json({ error: 'Internal server error' })
    }
  }

  static async register(req, res) {
    const result = validateUser(req.body)

    // Verificar si la validación fue exitosa
    if (!result) {
      return res.status(400).json({ error: 'Invalid request data' })
    }

    try {
      const { password } = result.data

      // Hash de la contraseña de forma asíncrona
      const hashedPassword = await bcrypt.hash(password, 10)

      // Registrar el nuevo usuario en la base de datos
      await userModel.register({
        input: { ...result.data, password: hashedPassword }
      })

      res.status(201).json({ message: 'User created successfully' })
    } catch (error) {
      console.error('Registration error:', error);

      // Enviar una respuesta más detallada sobre el error
      res.status(500).json({ error: `Internal server error: ${error.message}` })
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
