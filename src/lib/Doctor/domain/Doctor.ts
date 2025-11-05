export class Doctor{
    public id?:number;
    public firstName:string;
    public lastName:string;
    public dni: string;
    public email: string;
    public phone: string;
    public active: boolean;


    constructor(init?:Partial<Doctor>){
        Object.assign(this, init);
    }

    public mapToPrimitives(){
        return{
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            dni: this.dni,
            email: this.email,
            phone: this.phone,
            active: this.active
        }
    }
}