import { connection } from '../config.js'

export class userModel {
  static async createUrl({ hash, input }) {
    const { url, id } = input

    // Validar parámetros para evitar posibles inyecciones o errores
    if (!url || !hash) {
      throw new Error('Invalid input data')
    }

    // Construir la consulta SQL en función de si `id` está presente
    const query = id
      ? 'INSERT INTO Url (ShortUrl, OldUrl, UserID_Users) VALUES (?, ?, ?);'
      : 'INSERT INTO Url (ShortUrl, OldUrl) VALUES (?, ?);'

    // Ejecutar la consulta SQL
    try {
      await connection.execute(query, id ? [hash, url, id] : [hash, url])
    } catch (error) {
      console.error('Error al crear la URL:', error)
      throw new Error('Error al guardar la URL en la base de datos.')
    }

    return true
  }

  static async hash({ hash }) {
    const [link] = await connection.execute('SELECT OldUrl FROM Url where ShortUrl = ?;', [hash])
    return link
  }

  static async login({ input }) {
    const username = input
    // Validar el input para evitar problemas
    if (!username) {
      throw new Error('Username is required')
    }

    try {
      const [rows] = await connection.execute(
        'SELECT UserID, Username, Upassword FROM Users WHERE Username = ?',
        [username]
      )

      // Verificar si se encontró algún usuario
      if (rows.length === 0) {
        return []
      }

      return rows
    } catch (error) {
      console.error('Database query error:', error)
      throw new Error('Database query failed')
    }
  }

  static async register({ input }) {
    const { username, email, password } = input

    // Validar el input para evitar problemas
    if (!username || !email || !password) {
      throw new Error('All fields are required')
    }

    // Consulta SQL para insertar un nuevo usuario
    const query = `
      INSERT INTO Users (Username, Email, Upassword)
      VALUES (?, ?, ?);
    `

    try {
      // Ejecutar la consulta para insertar el nuevo usuario
      await connection.execute(query, [username, email, password])
    } catch (error) {
      console.error('Error al registrar el usuario:', error)

      if (error.code === 'ER_DUP_ENTRY') {
        throw new Error('User with this email or username already exists')
      } else if (error.code === 'ER_NO_SUCH_TABLE') {
        throw new Error('The table does not exist in the database')
      } else {
        throw new Error(`Database error: ${error.message}`)
      }
    }
    return true
  }

  static async links({ id }) {
    const [links] = await connection.execute('SELECT id, OldUrl, ShortUrl FROM Url where UserID_Users = ?;',
      [id]
    )
    return [links]
  }

  static async delete({ id }) {
    await connection.execute('DELETE FROM Url WHERE id = ?;', [id])
    return true
  }
}
