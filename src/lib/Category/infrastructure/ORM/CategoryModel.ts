import { Model, Sequelize,DataTypes } from "sequelize";

export class CategoryModel extends Model{
    public id!: number;
    public name!: string;
    public active!:boolean;


    public static initialize(sequelize:Sequelize){
        CategoryModel.init({
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
                modelName: 'category',
                tableName: 'categories',
                timestamps: true   
            
        })
        
    }
}
