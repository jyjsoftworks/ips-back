// models/LensModel.ts
import { Model, Sequelize, DataTypes } from "sequelize";
import { LensFrameModel } from "../../../LensFrame/infrastructure/ORM/LensFrameModel"
import { GlassModel } from "../../../Glass/infrastructure/ORM/GlassModel";
import { LetterModel } from "../../../Letter/infrastructure/ORM/LetterModel";
import { LensLetterModel } from "../../../LensLetter/infrastructure/ORM/LensLetterModel";

export class LensModel extends Model {
  public id!: number;
  public type!: string;
  public frameId!: number;
  public glassId!: number;

  public leftSphere!: number | null;
  public rightSphere!: number | null;
  public leftCylinder!: number | null;
  public rightCylinder!: number | null;
  public leftAxis!: number | null;
  public rightAxis!: number | null;
  public leftAddition!: number | null;
  public rightAddition!: number | null;

  public subtotal!: number;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static initialize(sequelize: Sequelize) {
    LensModel.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        type: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        frameId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        glassId: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },

        // Ojo izquierdo / derecho - esfera
        leftSphere: {
          type: DataTypes.DECIMAL(4, 2),
          allowNull: true,
        },
        rightSphere: {
          type: DataTypes.DECIMAL(4, 2),
          allowNull: true,
        },

        // cilindro
        leftCylinder: {
          type: DataTypes.DECIMAL(4, 2),
          allowNull: true,
        },
        rightCylinder: {
          type: DataTypes.DECIMAL(4, 2),
          allowNull: true,
        },

        // eje (0–180)
        leftAxis: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        rightAxis: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },

        // adición
        leftAddition: {
          type: DataTypes.DECIMAL(4, 2),
          allowNull: true,
        },
        rightAddition: {
          type: DataTypes.DECIMAL(4, 2),
          allowNull: true,
        },

        subtotal: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "lens",
        tableName: "lenses",
        timestamps: true,
      }
    );
  }

  public static associate() {
    LensModel.belongsTo(LensFrameModel, {
      foreignKey: "frameId",
      as: "frame",
    });

    LensModel.belongsTo(GlassModel, {
      foreignKey: "glassId",
      as: "glass",
    });

    LensModel.belongsToMany(LetterModel, {
      through: LensLetterModel,
      foreignKey: "lensId",
      otherKey: "letterId",
      as: "letters",
    });
  }
}
