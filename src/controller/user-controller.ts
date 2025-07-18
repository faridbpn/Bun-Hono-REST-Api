import { Hono } from "hono";
import { RegisterUserRequest, LoginUserRequest } from "../model/user-model";
import { UserService } from "../service/user-service";
import { ApplicationVariables } from "../model/app-model";

export const userController = new Hono<{Variables: ApplicationVariables}>();

userController.post('/api/users', async (c) => {
    const request = await c.req.json() as RegisterUserRequest;

    //kirim ke service
    const response = await UserService.register(request)

    //return response
    return c.json({
        data: response
    })
})

userController.post('/api/users/login', async (c) => {
    const request = await c.req.json() as LoginUserRequest;

    //kirim ke service
    const response = await UserService.login(request)

    //return response
    return c.json({
        data: response
    })
})

// kita mau pasang middleware bang
userController.use(async (c, next) => {
    const token = c.req.header('Authorization')
    const user  = await UserService.get(token)

    c.set('user', user)

    await next()
}) 

userController.get('/api/users/current', async (c) => {
    //ambil user

})