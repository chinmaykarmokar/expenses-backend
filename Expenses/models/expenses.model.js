import { DataTypes } from "sequelize";
import { connection } from "../../config/database.js";

export const Expenses = connection.define("expenses", {
    date: {
        type: DataTypes.BIGINT,
        primaryKey: true
    },
    expenses: {
        type: DataTypes.JSONB,

    }
}, {
    timestamps: false
});

Expenses.removeAttribute("id");