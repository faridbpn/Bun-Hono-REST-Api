import { prismaClients } from "../application/database";
import { LoginUserRequest, RegisterUserRequest, UpdateUserRequest, UserResponse, toUserResponse } from "../model/user-model";
import { UserValidation } from "../validation/user-validation";
import { HTTPException } from "hono/http-exception";
import { User } from "../generated/prisma";


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
                username: request.username
            },
            data: {
                token: crypto.randomUUID()
            }
        })

        const response = toUserResponse(user)
        response.token = user.token || undefined
        return response

    }

    static async get(token: string | undefined | null): Promise<User> {
        const result = UserValidation.TOKEN.safeParse(token)
        
        if(result.error) {
            throw new HTTPException(401, {
                message: "Unautorized"
            })
        }

        token = result.data as string;

        const user = await prismaClients.user.findFirst({
            where: {
                token: token
            }
        })

        if(!user) {
            throw new HTTPException(401, {
                message: "Unautorized"
            })
        }

        return user;
    }


    static async update(user: User, request: UpdateUserRequest) : Promise<UserResponse> {
        request = UserValidation.UPDATE.parse(request)

        const updateData: any = {}

        if(request.name) {
            updateData.name = request.name
        }

        if(request.password) {
            updateData.password = await Bun.password.hash(request.password, {
                algorithm: "bcrypt",
                cost: 10
            })
        }

        const updatedUser = await prismaClients.user.update({
            where: {
                username: user.username
            },
            data: updateData
        })

        return toUserResponse(updatedUser)
    }

    static async logout(user: User) : Promise<boolean> {
        await prismaClients.user.update({
            where: {
                username: user.username
            },
            data: {
                token: null
            }
        })

        return true;
    }
}