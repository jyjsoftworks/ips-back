import errorMessages from "../../../../message"
import { GlobalAppException } from "../../../Shared/Infrastructure/middleware/GlobalAppException";
import { UserRepository } from "../../domain/UserRepository";
import { LoginUserRequestDto } from "../dto/request/LoginUserRequestDto";
import bcrypt from "bcryptjs"
import JwtUtil from "../../../Utils/JwtUtil";

export class Login {
    constructor (private repository: UserRepository){};


    async run(loginData: LoginUserRequestDto):Promise <string> {
        const user = await this.repository.getUserByEmail(loginData.email);

        if (!user) {
            throw new GlobalAppException(
                404,
                '4003',
                errorMessages['4003'] || 'Usuario no encontrado',
                'El usuario con el ID especificado no existe'
            )
        };

        const isPasswordValid = await bcrypt.compare(loginData.password, user.password);

        

        if (!isPasswordValid) {
            throw new GlobalAppException(
                404,
                '4014',
                errorMessages['4014'] || 'Contraseña incoid: user.id, email:user.email,pass:user.passwordrrecta',
                'La contraseña es incorrecta'
            )
        };

        return JwtUtil.generateToken({id: user.id, email:user.email,active:user.active, lastLogin:user.lastLogin})


    }

}