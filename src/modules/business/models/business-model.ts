import { DataTypes, Model, Sequelize } from "sequelize";
import sequelize from "../../../config/database/postgre-sql-database";
import User from "../../user/models/user-model";

class Business extends Model {
  public id!: string;
  public phoneNumber!: string;
  public userName!: string;
  public password!: string;
  public firstName!: string;
  public lastName!: string;
  public mobileNo!: string;
  public countryCode!: string;
  public email!: string;
  public dob!: string;
  public gender!: string;
  public tag!: string;
  public userCategory!: string;
  public lastAccessed!: Date;
}

Business.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    businessName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    businessDescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mobileNo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    countryCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    businessSize: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tag: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "Business",
    timestamps: true,
  }
);

User.hasMany(Business, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

Business.belongsTo(User, {
  foreignKey: "userId",
});

export default Business;
