import { Sequelize } from "sequelize";

export const connection = new Sequelize(process.env.SUPABASE_DB_URL, {
    logging: false
});