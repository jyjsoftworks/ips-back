import { Model, Sequelize, DataTypes } from "sequelize";
import { CategoryModel } from "../../../Category/infrastructure/ORM/CategoryModel";
import { MaterialModel } from "../../../Material/infrastructure/ORM/MaterialModel";
import { TreatmentModel } from "../../../Treatment/infrastructure/ORM/TreatmentModel";

export class GlassModel extends Model {
  public id!: number;
  public idCategory!: number;
  public idMaterial!: number;
  public idTreatment!: number;
  public active!: boolean;

  public static initialize(sequelize: Sequelize) {
    GlassModel.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        idCategory: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        idMaterial: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        idTreatment: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        active: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: true,
        },
      },
      {
        sequelize,
        modelName: "glass",
        tableName: "glasses",
        timestamps: true,
      }
    );
  }

  public static associate() {
    GlassModel.belongsTo(CategoryModel, {
      foreignKey: "idCategory",
      as: "category",
    });

    GlassModel.belongsTo(MaterialModel, {
      foreignKey: "idMaterial",
      as: "material",
    });

    GlassModel.belongsTo(TreatmentModel, {
      foreignKey: "idTreatment",
      as: "treatment",
    });
  }
}
