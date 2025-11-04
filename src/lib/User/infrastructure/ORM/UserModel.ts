import { Model, Sequelize,DataTypes } from "sequelize";
import { RoleModel } from "../../../Role/infrastructure/ORM/RoleModel";


export class UserModel extends Model {
    public id!:number;
    public firstName !:string;
    public lastName !:string;
    public email!:string;
    public password!:string;
    public active!:boolean;
    public tokenActivation!: string;
    public confirmed!: boolean;
    public tokenRecovery!: string;
    public lastLogin!: Date;
    public addRole!: (role: number | RoleModel, options?: any) => Promise<void>;
    public roles?: RoleModel[];


    public static initialize(sequelize: Sequelize) {
        UserModel.init({
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
             firstName: {
                type: DataTypes.STRING,
                allowNull:false
            },
             lastName: {
                type: DataTypes.STRING,
                allowNull:false
            },
            email: {
                type: DataTypes.STRING,
                allowNull:false
            },
            password: {
                type: DataTypes.STRING,
                allowNull:false
            },
            active: {
                type: DataTypes.BOOLEAN,
                allowNull:true,
                defaultValue:true,
            },
            tokenActivation: {
                type: DataTypes.STRING,
                allowNull:true
            },
            confirmed: {
                type: DataTypes.BOOLEAN,
                allowNull:true,
                defaultValue:true
            },
            tokenRecovery: {
                type: DataTypes.STRING,
                allowNull:true
            },
            lastLogin: {
                type: DataTypes.DATE,
                allowNull:true
            },
        },{
            sequelize,
            modelName: 'user',
            tableName:'users',
            timestamps: true
        })
    }


    static associate() {
        
        this.belongsToMany(RoleModel, {
            through: 'user_role',
            as:'roles',
            foreignKey: 'userId',
        });
    }



}