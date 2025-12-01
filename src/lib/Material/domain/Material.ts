export class Material {
    public id?:number;
    public name:string;
    public active: boolean;


    constructor(init?:Partial<Material>){
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