export class Status{
    public id?:number;
    public name:string;
    public active: boolean;


    constructor(init?:Partial<Status>){
        Object.assign(this, init);
    }

    public mapToPrimitives(){
        return{
            id: this.id,
            name: this.name,
            active: this.active
        }
    }
}