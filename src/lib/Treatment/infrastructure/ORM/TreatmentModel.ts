import { Model, Sequelize, DataTypes } from "sequelize";

export class TreatmentModel extends Model {
  public id!: number;
  public name!: string;
  public sphereLimit!: number;
  public cylinderLimit!: number;
  public leadTimeDays!: number;
  public price!: number;
  public commission!: boolean;
  public commissionPercentage!: number;
  public active!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  public static initialize(sequelize: Sequelize) {
    TreatmentModel.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        sphereLimit: {
          type: DataTypes.DECIMAL(4, 2),
          allowNull: true,
        },
        cylinderLimit: {
          type: DataTypes.DECIMAL(4, 2),
          allowNull: true,
        },
        leadTimeDays: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        price: {
          type: DataTypes.DECIMAL(10, 2),
          allowNull: false,
        },
        commission: {
          type: DataTypes.BOOLEAN,
          allowNull: true,
        },
        commissionPercentage: {
          type: DataTypes.DECIMAL(5, 2),
          allowNull: true,
        },
        active:{
                type: DataTypes.BOOLEAN,
                allowNull:true,
                defaultValue:true
            }
      },
      {
        sequelize,
        modelName: "treatment",
        tableName: "treatments",
        timestamps: true, 
      }
    );
  }
}
