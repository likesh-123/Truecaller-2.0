import { DataTypes, Model, Sequelize } from "sequelize";
import sequelize from "../../../config/database/postgre-sql-database";
import User from "./user-model";

class Address extends Model {
  public id!: string;
  public addressLine1!: string;
  public addressLine2!: string;
  public city!: string;
  public state!: string;
  public country!: string;
  public pinCode!: string;
}

Address.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    addressLine1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    addressLine2: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    addressLine3: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pinCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "addresses",
    timestamps: true,
  }
);

export default Address;
