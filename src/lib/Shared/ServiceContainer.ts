import { CreateRole } from "../Role/application/CreateRole/CreateRole";
import { GetAllRoles } from "../Role/application/GetAllRoles/GetAllRoles";
import { RoleORMRepository } from "../Role/infrastructure/ORM/RoleORMRepository";
import { Login } from "../User/application/Login/Login";
import { UserCreate } from "../User/application/UserCreate/UserCreate";
import { UserORMRepository } from "../User/infrastructure/ORM/UserORMRepository";
import { UpdateUser } from "../User/application/UpdateUser/UpdateUser";
import { GetAllUsers } from "../User/application/GetAllUsers/GetAllUsers";
import { UserDelete } from "../User/application/UserDelete/UserDelete";
import { UserMe } from "../User/application/UserMe/UserMe";
import { GetUsersByRole } from "../User/application/GetAllUsers-by-Role/GetUsersByRole";
import { sequelize } from "../Shared/Infrastructure/config/sequelize";
import { CreateCategory } from "../Category/application/CreateCategory";
import { CategoryORMRepository } from "../Category/infrastructure/ORM/CategoryOrmRepository";
import { GetCategory } from "../Category/application/GetCategory";
import { UpdateCategory } from "../Category/application/UpdateCategory";
import { GetByIdCategory } from "../Category/application/GetByIdCategory";

const userRepository= new UserORMRepository();
const roleRepository= new RoleORMRepository();
const categoryRepository= new CategoryORMRepository();


export const serviceContainer= {

    user:{
        getAll: new GetAllUsers(userRepository),
        create: new UserCreate(userRepository,roleRepository, sequelize),
        login: new Login(userRepository),
        updateUser: new UpdateUser(userRepository),
        userDelete: new UserDelete(userRepository),
        userMe: new UserMe(userRepository),
        getUserByRole: new GetUsersByRole(userRepository,roleRepository),
    },
    role:{
        getAll: new GetAllRoles(roleRepository),
        createRole: new CreateRole(roleRepository)
    },
    category: {
        create: new CreateCategory(categoryRepository),
        getAll: new GetCategory(categoryRepository),
        update: new UpdateCategory(categoryRepository),
        getById: new GetByIdCategory(categoryRepository)
    }
    
}