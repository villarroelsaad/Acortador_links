import mysql from 'mysql2/promise'
import jsonwebtoken from 'jsonwebtoken'

export const Secret = 'kjsdafhksdjahflksadfhlksjdafh'
const allowedOrigins = ['https://acortador-links-front.vercel.app']
export const corsOptions = {
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

export const connection = await mysql.createConnection({
    host: 'betxwuucvkixjqb9vapw-mysql.services.clever-cloud.com',
    user: 'u7rnrdilogdxm8ks',
    password: '5GfGWtuHc3bo34PbSRUK',
    database: 'betxwuucvkixjqb9vapw'
})

export const session = (req, res, next) => {
    const token = req.cookies.access_token
    req.session = { user: null }

    try {
        const data = jsonwebtoken.verify(token, Secret)
        req.session.user = data
    } catch { }
    next()
}
