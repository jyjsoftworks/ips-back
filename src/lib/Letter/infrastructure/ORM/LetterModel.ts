import { Model, Sequelize,DataTypes } from "sequelize";
import { PatientModel } from "../../../Patient/infrastructure/ORM/PatientModel";
import { DoctorModel } from "../../../Doctor/infrastructure/ORM/DoctorModel";
import { SellerModel } from "../../../Seller/infrastructure/ORM/SellerModel";
import { LensModel } from "../../../Lens/infrastructure/ORM/LensModel";
import { LensLetterModel } from "../../../LensLetter/infrastructure/ORM/LensLetterModel";

export class LetterModel extends Model{
    public id!:number;
    public idPatient!:number;
    public idDoctor!:number;
    public idSeller:number;
    public active!: boolean;

    public static initialize(sequelize:Sequelize){
        LetterModel.init({
            id:{
                type: DataTypes.INTEGER,
                primaryKey:true,
                autoIncrement:true
            },
            idPatient:{
                type: DataTypes.INTEGER,
                allowNull:false
            },
             idDoctor:{
                type: DataTypes.INTEGER,
                allowNull:false
            },
             idSeller:{
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
                modelName: 'letter',
                tableName: 'letters',
                timestamps: true   
            
        })
        
    }

    public static associate() {
    LetterModel.belongsTo(PatientModel, {
      foreignKey: "idPatient",
      as: "patient",
    });

    LetterModel.belongsTo(DoctorModel, {
      foreignKey: "idDoctor",
      as: "doctor",
    });

    LetterModel.belongsTo(SellerModel, {
      foreignKey: "idSeller",
      as: "seller",
    });

    LetterModel.belongsToMany(LensModel, {
      through: LensLetterModel,
      foreignKey: "letterId",
      otherKey: "lensId",
      as: "lenses",
    });

  }

}
