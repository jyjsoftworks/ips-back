export class Doctor{
    public id?:number;
    public firstName:string;
    public lastName:string;
    public mat_nac: string;
    public mat_prov: string;
    public active: boolean;


    constructor(init?:Partial<Doctor>){
        Object.assign(this, init);
    }

    public mapToPrimitives(){
        return{
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            mat_nac: this.mat_nac,
            mat_prov: this.mat_prov,
            active: this.active
        }
    }
}