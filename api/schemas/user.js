import { z } from 'zod'

// Definir esquemas completos para validación de datos
const userSchema = z.object({
    username: z.string().min(5, 'Username debe tener minimo 5 caracteres'),
    email: z.string().email('Email invalido'), // Email debe ser válido
    password: z.string().min(8, 'La contrasena debe tener minimo 8 caracteres'),
    url: z.string().url('URL invalida') // Opcional, si se necesita URL
})

const urlSchema = z.object({
    id: z.number().int(),
    url: z.string().url('URL invalida')
})

// Función de validación para usuarios
export const validateUser = function (object) {
    return userSchema.safeParse(object)
}

// Función de validación para URLs
export const validateUrl = function (object) {
    return urlSchema.partial.safeParse(object)
}
