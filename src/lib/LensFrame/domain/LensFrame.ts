export class LensFrame{
    public id?:number;
    public templeNumber:string;
    public brand:string;
    public price: number;
    public commission: boolean;
    public commissionPercentage:number;
    public active: boolean;


    constructor(init?:Partial<LensFrame>){
        Object.assign(this, init);
    }

    public mapToPrimitives(){
        return{
            id: this.id,
            templeNumber: this.templeNumber,
            brand: this.brand,
            price: this.price,
            commission: this.commission,
            commissionPercentage: this.commissionPercentage,
            active: this.active
        }
    }
}