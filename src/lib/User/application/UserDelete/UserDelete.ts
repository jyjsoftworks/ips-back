import { GlobalAppException } from "../../../Shared/Infrastructure/middleware/GlobalAppException";
import { UserRepository } from "../../domain/UserRepository";
import errorMessages from "../../../../message";


export class UserDelete{
    constructor(private repository: UserRepository){}

    async run (id:number):Promise<void>{
        const user = await this.repository.getUserById(id);
        if (!user) {
            throw new GlobalAppException(
              404,
              "4041",
              errorMessages["4041"],
              "El usuario con el Id especificado no existe"
            );
          }
          await this.repository.userDelete(id);
    }

}