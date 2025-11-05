import { Model, Sequelize,DataTypes } from "sequelize";

export class SellerModel extends Model{
    public id!:number;
    public idUser!:number;
    public idBranchOffice!:number;
    public active!: boolean;

    public static initialize(sequelize:Sequelize){
        SellerModel.init({
            id:{
                type: DataTypes.INTEGER,
                primaryKey:true,
                autoIncrement:true
            },
            idUser:{
                type: DataTypes.INTEGER,
                allowNull:false
            },
             idBranchOffice:{
                type: DataTypes.INTEGER,
                allowNull:false
            },
            active:{
                type: DataTypes.BOOLEAN,
                allowNull:true,
                defaultValue:true
            }
        },{
                sequelize,
                modelName: 'seller',
                tableName: 'sellers',
                timestamps: true   
            
        })
        
    }
}
