import z from 'zod'

const userSchema = z.object({
    username: z.string().min(5),
    email: z.string().min(15),
    password: z.string().min(10),
    url: z.optional().url()
})
const urlSchema = z.object({
    id: z.number().int(),
    url: z.url()
})

export const validateUser = function (object) {
    return userSchema.safeParse(object)
}

export const validateUrl = function (object) {
    return urlSchema.partial().safeParse(object)
}
