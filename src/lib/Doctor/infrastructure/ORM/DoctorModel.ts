import { Model, Sequelize,DataTypes } from "sequelize";

export class DoctorModel extends Model{
    public id!:number;
    public firstName!:string;
    public lastName!:string;
    public dni!: string;
    public email!: string;
    public phone!: string;
    public active!: boolean;

    public static initialize(sequelize:Sequelize){
        DoctorModel.init({
            id:{
                type: DataTypes.INTEGER,
                primaryKey:true,
                autoIncrement:true
            },
            firstName:{
                type: DataTypes.STRING,
                allowNull:false
            },
            lastName:{
                type: DataTypes.STRING,
                allowNull:false
            },
             dni:{
                type: DataTypes.STRING,
                allowNull:false
            },
             email:{
                type: DataTypes.STRING,
                allowNull:false
            },
             phone:{
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
                modelName: 'doctor',
                tableName: 'doctors',
                timestamps: true   
            
        })
        
    }
}
