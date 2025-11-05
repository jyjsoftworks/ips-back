export class Patient{
    public id?:number;
    public firstName:string;
    public lastName:string;
    public dni: string;
    public address:string;
    public email: string;
    public phone: string;
    public active: boolean;


    constructor(init?:Partial<Patient>){
        Object.assign(this, init);
    }

    public mapToPrimitives(){
        return{
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            dni: this.dni,
            address: this.address,
            email: this.email,
            phone: this.phone,
            active: this.active
        }
    }
}