import { UserUpdateRequestDto } from "../application/dto/request/UserUpdateRequestDto";
import { User } from "./User";
import { Transaction } from "sequelize";


export interface UserRepository{

    getAllUsers(): Promise<User[]>;
    getActiveUsers(): Promise<User[]>;
    getUserByEmail(email:string): Promise <User | null>;
    create(user:User, transaction?:Transaction): Promise <User>
    updateUser(id:number, dto:UserUpdateRequestDto):Promise<void>;
    getUserById(id:number):Promise<User | null>;
    userDelete(id: number):Promise<void>;
    assignRole(userId: number, roleId: number, transaction: Transaction): Promise<void>;
    getUserRole(userId: number): Promise<string | null>;
    getUsersByRoleId(roleId: number): Promise<User[]>;

    
}

