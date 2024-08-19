import { Router } from 'express'
import { UserController } from '../controllers/user.js'

export const routerUser = Router()

routerUser.get('/', UserController.home)
routerUser.get('/:hash', UserController.hash)
routerUser.get('/links/:id', UserController.links)
routerUser.get('/logout', UserController.logOut)

routerUser.post('/login', UserController.login)
routerUser.post('/register', UserController.register)
routerUser.post('/url/create', UserController.createUrl)

routerUser.delete('/delete/:id', UserController.delete)
