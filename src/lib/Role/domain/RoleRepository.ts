import { RoleCreateRequestDTO } from "../application/dto/request/RoleCreateRequestDTO";
import { Role } from "./Role";


export interface RoleRepository{
    getAllRoles(): Promise<Role[]>;
    getActiveRoles(): Promise<Role[]>;
    createRole(dto:RoleCreateRequestDTO): Promise<Role>;

    getByName(name:string): Promise <number | null>;
}