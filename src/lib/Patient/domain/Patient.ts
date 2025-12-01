export class Patient{
    public id?:number;
    public firstName:string;
    public lastName:string;
    public dni: string;
    public phone: string;
    public observation:string;
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
            phone: this.phone,
            observation: this.observation,
            active: this.active
        }
    }
}