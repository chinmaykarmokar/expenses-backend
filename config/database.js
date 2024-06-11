import { Sequelize } from "sequelize";

export const connection = new Sequelize("postgres://postgres.okamdzdhzckndalowogn:trkvopLhQHIadWR1@aws-0-ap-south-1.pooler.supabase.com:6543/postgres?pgbouncer=true", {
    logging: false
});