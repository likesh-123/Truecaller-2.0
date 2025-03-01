import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

class PostgresDatabase {
  private static instance: Sequelize;

  private constructor() {}

  public static getInstance(): Sequelize {
    if (!PostgresDatabase.instance) {
      PostgresDatabase.instance = new Sequelize(
        process.env.DB_NAME as string,
        process.env.DB_USER as string,
        process.env.DB_PASSWORD as string,
        {
          host: process.env.DB_HOST,
          port: Number(process.env.DB_PORT),
          dialect: "postgres",
          pool: {
            max: 10,
            min: 0,
            acquire: 30000,
            idle: 10000,
          },
          logging: false,
        }
      );
    }
    return PostgresDatabase.instance;
  }
}

export default PostgresDatabase.getInstance();
