import { DataTypes, Model, Sequelize } from "sequelize";
import sequelize from "../../../config/database/postgre-sql-database";
import Address from "./address-model";

class User extends Model {
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
  public addressId!: string;
}

User.init(
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
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    initials: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    countryCode: {
      type: DataTypes.STRING,
      defaultValue: "+91",
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dob: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tag: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userCategory: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    addressId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "addresses",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    lastAccessed: {
      type: DataTypes.DATE,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    },
  },
  {
    sequelize,
    tableName: "users",
    timestamps: true,
  }
);

User.belongsTo(Address, { foreignKey: "addressId", as: "addresses" });
Address.hasOne(User, { foreignKey: "addressId", as: "user" });

export default User;



// Distributed trie implementation by linkedin
