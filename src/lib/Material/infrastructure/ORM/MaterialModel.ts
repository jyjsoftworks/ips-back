import { Model, Sequelize,DataTypes } from "sequelize";

export class MaterialModel extends Model{
    public id!: number;
    public name!: string;
    public active!:boolean;


    public static initialize(sequelize:Sequelize){
        MaterialModel.init({
            id:{
                type: DataTypes.INTEGER,
                primaryKey:true,
                autoIncrement:true
            },
            name:{
                type: DataTypes.STRING,
                allowNull:false
            },
            active:{
                type: DataTypes.BOOLEAN,
                allowNull:true,
                defaultValue:true
            }
        },{
                sequelize,
                modelName: 'material',
                tableName: 'materials',
                timestamps: true   
            
        })
        
    }
}
