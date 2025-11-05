export class BranchOffice{
    public id?:number;
    public name:string;
    public address: string;
    public phone: string;
    public active: boolean;


    constructor(init?:Partial<BranchOffice>){
        Object.assign(this, init);
    }

    public mapToPrimitives(){
        return{
            id: this.id,
            name: this.name,
            address: this.address,
            phone: this.phone,
            active: this.active
        }
    }
}