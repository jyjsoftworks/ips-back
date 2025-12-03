export class Glass {
        public id?: number;
        public idCategory: number;
        public idMaterial: number;
        public idTreatment: number;
        public active: boolean;

    constructor(init?:Partial<Glass>){
        Object.assign(this, init);
    }


    public mapToPrimitives(){
            return{
                id: this.id,
                idCategory: this.idCategory,
                idMaterial: this.idMaterial,
                idTreatment: this.idTreatment,
                active: this.active
            }
        }
}