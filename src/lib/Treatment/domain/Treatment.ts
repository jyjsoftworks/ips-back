export class Treatment {
    
    public id?:number;
    public name:string;
    public sphereLimit:number;
    public cylinderLimit:number;
    public leadTimeDays:number;
    public price:number;
    public commission:boolean;
    public commissionPercentage:number;
    public active: boolean;

    constructor(init?:Partial<Treatment>){
        Object.assign(this, init);
    }

    public mapToPrimitives(){
            return{
                id: this.id,
                name: this.name,
                sphereLimit: this.sphereLimit,
                cylinderLimit: this.cylinderLimit,
                leadTimeDays: this.leadTimeDays,
                price: this.price,
                comission: this.commission,
                comissionPercentage: this.commissionPercentage,
                active: this.active
            }
        }
    
}