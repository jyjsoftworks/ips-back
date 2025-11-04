import { RoleCreateRequestDTO } from "../../application/dto/request/RoleCreateRequestDTO";
import { Role } from "../../domain/Role";
import { RoleRepository } from "../../domain/RoleRepository";
import { RoleModel } from "./RoleModel";



export class RoleORMRepository implements RoleRepository{

    async getByName(name: string): Promise<number | null> {
        const roleId = await RoleModel.findOne({
            where: {name},
            attributes: ['id'], // Obtiene solo el atributo 'id'
            raw: true,          // Devuelve un objeto plano
        }); 
    
        return roleId ? roleId.id : null; // Devuelve solo el id o null si no existe
    }


    async getAllRoles(): Promise<Role[]> {
        const role= await RoleModel.findAll();
        return role.map(role => this.mapToDomain(role));
    }
    async getActiveRoles(): Promise<Role[]> {
        const role= await RoleModel.findAll({where:{active:true}, raw:true});
        return role.map(role => this.mapToDomain(role));
    }

    async createRole(dto:RoleCreateRequestDTO): Promise<Role>{
        const role = await RoleModel.create({
            name:dto.name,           
        });
        return this.mapToDomain(role);
    }





    private mapToDomain (roleModel: RoleModel): Role{
        return new Role({
            id: roleModel.id,
            name: roleModel.name,
            active: roleModel.active
        })
    }

}