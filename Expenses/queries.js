import { Expenses } from "./models/expenses.model.js";

export const addExpenseQueryHandler = async (payload) => {
    try {
        const expenses = await Expenses.findOne({
            where: {
                date: payload.date
            }
        });

        if (expenses) {
            const result = await updateOneDayExpenseQueryHandler(
                payload.date.toString(), {
                ...expenses.dataValues.expenses,
                ...payload.expenses
            });
            return {
                message: "Successfully updated result."
            };
        }
        else {
            const result = await Expenses.create(payload);
            return result;
        }
    }
    catch (error) {
        print(`Error: ${error}`);
        return error;
    }
}

export const getOneDayExpenseQueryHandler = async (whereConditions) => {
    try {
        const expenses = await Expenses.findOne(whereConditions);
        return expenses;
    }
    catch (error) {
        return error;
    }
}

export const getCurrentMonthTotalExpensesQueryHandler = async (whereConditions) => {
    try {
        const expenses = await Expenses.findAll(whereConditions);
        return expenses;
    }
    catch (error) {
        return error;
    }
}

export const getCurrentMonthDailyExpensesQueryHandler = async (whereConditions) => {
    try {
        const expenses = await Expenses.findAll(whereConditions);
        return expenses;
    }
    catch (error) {
        return error;
    }
}

export const getExpensesByDateRangeQueryHandler = async (whereConditions) => {
    try {
        const expenses = await Expenses.findAll(whereConditions);
        return expenses;
    }
    catch (error) {
        return error;
    }
}


export const updateOneDayExpenseQueryHandler = async (date, updateExpensePayload) => {
    try {
        await Expenses.update({
            expenses: updateExpensePayload
        }, {
            where: {
                date: date
            }
        })
    }
    catch (error) {
        return error;
    }
}