
export class UserMeDto {

    public userId: number;
    public name: string;
    public role:string

    constructor( userId:number, name:string, role:string) {
        this.userId = userId
        this.name = name
        this.role = role
        
    }
}