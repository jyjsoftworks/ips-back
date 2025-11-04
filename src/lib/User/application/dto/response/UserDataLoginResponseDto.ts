export class UserDataLoginResponseDto {
    name: string;
    role: string;
    active: boolean;

    constructor(
    name: string,
    role: string,
    active: boolean
    ) {
        this.name = name;
        this.role = role;
        this.active = active;
    }
  }
  