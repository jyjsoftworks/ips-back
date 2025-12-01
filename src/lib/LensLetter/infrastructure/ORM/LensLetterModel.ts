import { Model, Sequelize, DataTypes } from "sequelize";
import { LensModel } from "../../../Lens/infrastructure/ORM/LensModel";
import { LetterModel } from "../../../Letter/infrastructure/ORM/LetterModel";

export class LensLetterModel extends Model {
  public letterId!: number;
  public lensId!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static initialize(sequelize: Sequelize) {
    LensLetterModel.init(
      {
        letterId: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
        },
        lensId: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "lensLetter",
        tableName: "lensLetter",
        timestamps: true,
      }
    );
  }

  public static associate() {
    LensLetterModel.belongsTo(LetterModel, {
      foreignKey: "letterId",
      as: "letter",
    });

    LensLetterModel.belongsTo(LensModel, {
      foreignKey: "lensId",
      as: "lens",
    });
  }
}
