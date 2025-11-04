import { Model, Sequelize,DataTypes } from "sequelize";
import { UserModel } from "../../../User/infrastructure/ORM/UserModel";

export class RoleModel extends Model{
    public id!: number;
    public name!: string;
    public active!:boolean;


    public static initialize(sequelize:Sequelize){
        RoleModel.init({
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
                modelName: 'role',
                tableName: 'roles',
                timestamps: true   
            
        })
        
    }


    static associate(){
        this.belongsToMany(UserModel, {
            through: 'user_role',
            as:'users',
            foreignKey: 'roleId'
        })
    }
}
