import { GlobalAppException } from "../../../Shared/Infrastructure/middleware/GlobalAppException";
import { RoleRepository } from "../../domain/RoleRepository";
import { RoleGeneralResponseDto } from "../dto/RoleGeneralResponseDto";
import errorMessages from "../../../../message";
import { plainToInstance } from "class-transformer";






export class GetAllRoles{
    constructor (private repository:RoleRepository){}

    async run():Promise<RoleGeneralResponseDto[]>{
        try {
            const roles = await this.repository.getActiveRoles();
            if (!roles.length){
                throw new GlobalAppException(
                    204,
                    '2006',
                    errorMessages['2006'],
                    'No se encontraron roles activos'

                )
            }
            const roleDto=roles.map(role=>
                plainToInstance(RoleGeneralResponseDto,{
                    name: role.name,
                    active: role.active
                })
            )

                return roleDto;
            
        } catch (error) {

            throw error instanceof GlobalAppException? error : new GlobalAppException(
                500,
                '5000',
                errorMessages['5000'],
                'error inesperado al obtener los roles'
            )
            
        }
    }
}