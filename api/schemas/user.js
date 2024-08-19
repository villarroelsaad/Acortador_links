import { z } from 'zod'

const userSchema = z.object({
    username: z.string().min(5, 'Username debe tener minimo 5 caracteres'),
    email: z.string().email('Email invalido'),
    password: z.string().min(7, 'La contrasena debe tener minimo 8 caracteres')
})

const urlSchema = z.object({
    id: z.number().int(),
    url: z.string().url('URL invalida')
})

// Función de validación para usuarios
export const validateUser = function (object) {
    return userSchema.safeParse(object)
}
export const validateUserLogin = function (object) {
    return userSchema.partial().safeParse(object)
}

// Función de validación para URLs
export const validateUrl = function (object) {
    return urlSchema.partial().safeParse(object)
}
