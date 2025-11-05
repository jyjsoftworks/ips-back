import { Model, Sequelize,DataTypes } from "sequelize";

export class BranchOfficeModel extends Model{
    public id?:number;
    public name!:string;
    public address!: string;
    public phone!: string;
    public active!: boolean;

    public static initialize(sequelize:Sequelize){
        BranchOfficeModel.init({
            id:{
                type: DataTypes.INTEGER,
                primaryKey:true,
                autoIncrement:true
            },
            name:{
                type: DataTypes.STRING,
                allowNull:false
            },
            address:{
                type: DataTypes.STRING,
                allowNull:false
            },
             phone:{
                type: DataTypes.STRING,
                allowNull:false
            }
        },{
                sequelize,
                modelName: 'branch_office',
                tableName: 'branch_offices',
                timestamps: true   
            
        })
        
    }
}
