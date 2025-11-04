import { GlobalAppException } from "../../../Shared/Infrastructure/middleware/GlobalAppException";
import { UserRepository } from "../../domain/UserRepository";
import { UserGeneralResponseDto } from "../dto/response/UserGeneralResponseDto";
import {plainToInstance} from "class-transformer"
import errorMessages from "../../../../message";

export class GetAllUsers{
    constructor(private repository:UserRepository){}

    async run():Promise<UserGeneralResponseDto[]>{
        try {
            const users = await this.repository.getActiveUsers();
            if (!users.length) {
                throw new GlobalAppException(
                    204,
                    '2006',
                    errorMessages['2006'],
                    'No se encontraron ususarios activos'
                )
            }
            const userDto=users.map(user =>
                ({
                    id:user.id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    active: user.active,
                    confirmed: user.confirmed,
                    lastLogin: user.lastLogin,
                roles: user.roles?.map(role => ({
                    id: role.id,
                    name: role.name
                })) || []
                })
            )

                return userDto;
            
        } catch (error) {

            throw error instanceof GlobalAppException ? error : new GlobalAppException( 
                500,
                '5000',
                errorMessages['5000'],
                'error inesperado al obtener los usuarios'
            )
            
        }
    }
}