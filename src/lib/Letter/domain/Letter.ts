export class Letter{
    public id?:number;
    public idPatient:number;
    public idDoctor:number;
    public idSeller:number;
    public active: boolean;


    constructor(init?:Partial<Letter>){
        Object.assign(this, init);
    }

    public mapToPrimitives(){
        return{
            id: this.id,
            idPatient: this.idPatient,
            idDoctor: this.idDoctor,
            idSeller: this.idSeller,
            active: this.active
        }
    }
}