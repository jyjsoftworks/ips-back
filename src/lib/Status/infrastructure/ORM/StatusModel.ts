import { Model, Sequelize,DataTypes } from "sequelize";

export class StatusModel extends Model{
    public id!: number;
    public name!: string;
    public active!:boolean;


    public static initialize(sequelize:Sequelize){
        StatusModel.init({
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
                modelName: 'status',
                tableName: 'status',
                timestamps: true   
            
        })
        
    }
}
