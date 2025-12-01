import { Model, Sequelize,DataTypes } from "sequelize";

export class LensFrameModel extends Model{
    public id!:number;
    public templeNumber!:string;
    public brand!:string;
    public price!: number;
    public commission!: boolean;
    public commissionPercentage!:number;
    public active!: boolean;

    public static initialize(sequelize:Sequelize){
        LensFrameModel.init({
            id:{
                type: DataTypes.INTEGER,
                primaryKey:true,
                autoIncrement:true
            },
            templeNumber:{
                type: DataTypes.STRING,
                allowNull:false
            },
            brand:{
                type: DataTypes.STRING,
                allowNull:false
            },
            price:{
                type: DataTypes.INTEGER,
                allowNull:false
            },
            commission:{
                type: DataTypes.BOOLEAN,
                allowNull:false
            },
             commissionPercentage:{
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
                modelName: 'lens_frame',
                tableName: 'lens_frames',
                timestamps: true   
            
        })
        
    }
}
