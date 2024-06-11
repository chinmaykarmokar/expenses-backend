import { 
    addExpenseQueryHandler, 
    getOneDayExpenseQueryHandler,
    getExpensesQueryHandler,
    getCurrentMonthTotalExpensesQueryHandler, 
    getExpensesByDateRangeQueryHandler,
    updateOneDayExpenseQueryHandler
} from "../queries.js";
import { Op, where } from "sequelize";

export const addExpenseService = async (payload) => {
    try {
        const addExpenseQueryResult = await addExpenseQueryHandler(payload);

        if (addExpenseQueryResult.errors) {
            return {
                message: "Expense not added."
            }
        }
        else {
            return {
                message: "Expenses added successfully!"
            }
        }
    }
    catch (error) {
        return {
            message: error
        };
    }
}

export const getExpensesService = async () => {
    try {
        const getExpensesQueryResult = await getExpensesQueryHandler();
        return {
            data: getExpensesQueryResult
        };
    }
    catch (error) {
        return {
            message: error
        }
    }
}

export const getCurrentMonthTotalExpenses = async () => {
    try {
        const date = new Date();
        const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1, 0).getTime()/1000;
        const currentDayOfMonth = new Date().setHours(0,0,0,0)/1000;

        const whereConditions = {
            where: {
                date: {
                    [Op.gte]: firstDayOfMonth,
                    [Op.lte]: currentDayOfMonth
                }
            }
        }

        const getExpensesQueryResult = await getCurrentMonthTotalExpensesQueryHandler(whereConditions);

        let totalExpenses = 0;

        for (let i  = 0; i < getExpensesQueryResult?.length; i++) {
            const singleExpense = getExpensesQueryResult[i]?.dataValues?.expenses;

            Object.keys(singleExpense).map(expense => 
                totalExpenses += singleExpense[expense]
            )
        }

        return {
            data: totalExpenses
        }
    }
    catch (error) {
        return {
            message: error
        }
    }
}

export const getExpensesByDateRange = async (startdate, enddate) => {
    try {
        const startDate = new Date(startdate).getTime()/1000;
        const endDate = new Date(enddate).getTime()/1000;

        const whereConditions = {
            where: {
                date: {
                    [Op.gte]: startDate,
                    [Op.lte]: endDate
                }
            }
        }

        const getExpensesByDateRangeQueryResult = await getExpensesByDateRangeQueryHandler(whereConditions);

        return {
            data: getExpensesByDateRangeQueryResult
        }
    }
    catch (error) {
        return {
            message: error
        }
    }
}

export const updateOneDayExpense = async (date, payload) => {
    console.log(payload);
    try {
        const whereConditions = {
            where: {
                date: date
            }
        }

        const expenses = await getOneDayExpenseQueryHandler(whereConditions);

        delete payload["date"];

        const updateExpensePayload = {
            ...expenses?.dataValues?.expenses,
            ...payload
        }

        const updateExpense = await updateOneDayExpenseQueryHandler(expenses?.dataValues?.date, expenses?.dataValues, updateExpensePayload);

        return {
            message: "Expenses updated."
        }
    }
    catch (error) {
        return {
            message: error
        }
    }
}