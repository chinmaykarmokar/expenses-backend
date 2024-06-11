import { Expenses } from "./models/expenses.model.js";

export const addExpenseQueryHandler = async (payload) => {
    try {
        const result = await Expenses.create(payload);
        return result;
    }
    catch (error) {
        return error;
    }
}

export const getExpensesQueryHandler = async () => {
    try {
        const expenses = await Expenses.findAll();
        return expenses;
    }
    catch (error) {
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

export const getExpensesByDateRangeQueryHandler = async (whereConditions) => {
    try {
        const expenses = await Expenses.findAll(whereConditions);
        return expenses;
    }
    catch (error) {
        return error;
    }
}


export const updateOneDayExpenseQueryHandler = async (date, oneDayExpense, updateExpensePayload) => {
    try {
        console.log(oneDayExpense, updateExpensePayload)
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