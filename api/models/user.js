import { connection } from '../config.js'

export class userModel {
    static async createUrl(hash, input) {
        const { url, id } = input
        if (id) {
            await connection.execute('insert into Url (ShortUrl, OldUrl, UserID_Users) values (?,?,?);', [hash, url, id])
        } else {
            await connection.execute('insert into Url (ShortUrl, OldUrl) values (?,?);', [hash, url])
        }
        return true
    }

    static async hash(hash) {
        const [link] = await connection.execute('SELECT OldUrl FROM Url where ShortUrl = ?;', [hash])
        return [link]
    }

    static async login(input) {
        const { username } = input
        const [userRows] = await connection.execute('SELECT UserID, Username, Upassword FROM Users WHERE Username = ?', [username])
        return [userRows]
    }

    static async register(input) {
        const { username, email, hashedPassword } = input
        await connection.execute('insert into Users (Username, Email,Upassword) values (?,?,?);', [username, email, hashedPassword])
        return true
    }

    static async links({ id }) {
        const [links] = await connection.execute('SELECT id, OldUrl, ShortUrl FROM Url where UserID_Users = ?;', [id])
        return [links]
    }

    static async delete({ id }) {
        await connection.execute('DELETE FROM Url WHERE id = ?;', [id])
        return true
    }
}
