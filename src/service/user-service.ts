import th from "zod/v4/locales/th.cjs";
import { prismaClients } from "../application/database";
import { LoginUserRequest, RegisterUserRequest, UserResponse, toUserResponse } from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { HTTPException } from "hono/http-exception";


export class UserService {
    static async register(request: RegisterUserRequest): Promise<UserResponse> {
        //validasi semua request
         request = UserValidation.REGISTER.parse(request)

        //cek apakah ada di database atau tidak 
        const totalUserWithSameUsername = await prismaClients.user.count({
            where: {
                username: request.username
            }
        })

        if(totalUserWithSameUsername != 0){
            throw new HTTPException(400, {
                message: "Username Already Exists"
            })
        }

        //hashing password dengan bcrypt
        request.password = await Bun.password.hash(request.password, {
            algorithm: "bcrypt",
            cost: 10
        })

        //save ke database
        const user = await prismaClients.user.create({
            data: request
        })

        //return response
        return toUserResponse(user)
    }

    static async login(request: LoginUserRequest): Promise<UserResponse> {
        request = UserValidation.LOGIN.parse(request)

        let user = await prismaClients.user.findUnique({
            where: {
                username: request.username
            }
        })

        if(!user) {
            throw new HTTPException(401, {
                message: "Username or Password Is Wrong"
            })
        }

        const isPasswordValid = await Bun.password.verify(request.password, user.password, 'bcrypt')
        if(!isPasswordValid) {
            throw new HTTPException(401, {
                message: "Username or Password Is Wrong"
            })
        }

        user = await prismaClients.user.update({
            where: {
                UserActivation: request.username
            },
            data: {
                token: crypto.randomUUID()
            }
        })

    }
}