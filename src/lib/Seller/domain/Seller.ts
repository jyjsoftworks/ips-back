export class Seller{
    public id?:number;
    public idUser:number;
    public idBranchOffice:number;
    public active: boolean;


    constructor(init?:Partial<Seller>){
        Object.assign(this, init);
    }

    public mapToPrimitives(){
        return{
            id: this.id,
            idUser: this.idUser,
            idBranchOffice: this.idBranchOffice,
            active: this.active
        }
    }
}