import { DataTypes, Model, Sequelize } from "sequelize";
import sequelize from "../../../config/database/postgre-sql-database";
import User from "../../user/models/user-model";

class Contact extends Model {
  public id!: string;
  public phoneNumber!: string;
  public firstName!: string;
  public lastName!: string;
  public mobileNo!: string;
  public countryCode!: string;
  public email!: string;
}

Contact.init(
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
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
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
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
  },
  {
    sequelize,
    tableName: "contacts",
    timestamps: true,
  }
);

Contact.belongsTo(User, { foreignKey: "userId", as: "users" });
User.hasMany(Contact, { foreignKey: "userId", as: "contacts" });

export default Contact;
