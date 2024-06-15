import { 
    addExpenseQueryHandler, 
    getOneDayExpenseQueryHandler,
    getCurrentMonthTotalExpensesQueryHandler, 
    getCurrentMonthDailyExpensesQueryHandler,
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

export const getOneDayExpenseService = async (date) => {
    try {
        const dateInEpoch = new Date(date)/1000;

        const whereConditions = {
            where: {
                date: dateInEpoch
            }
        }

        const expenses = await getOneDayExpenseQueryHandler(whereConditions);
        return expenses?.expenses;
    }
    catch (error) {
        return {
            message: error
        }
    }
}

export const getCurrentMonthTotalExpensesService = async () => {
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

export const getCurrentMonthDailyExpensesService = async () => {
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

        const getExpensesQueryResult = await getCurrentMonthDailyExpensesQueryHandler(whereConditions);
        
        const dayWiseExpenses = [];

        for (let i = 0; i < getExpensesQueryResult?.length; i++) {
            const oneDayExpense = getExpensesQueryResult[i];

            dayWiseExpenses.push({
                date: oneDayExpense.date,
                totalexpense: Object.values(oneDayExpense.expenses).reduce((a,b) => a + b)
            });
        }

        return {
            data: dayWiseExpenses
        }
    }
    catch (error) {
        return error;
    }
}

export const getExpensesByDateRangeService = async (startdate, enddate) => {
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
        const dayWiseExpenses = [];

        for (let i = 0; i < getExpensesByDateRangeQueryResult?.length; i++) {
            const oneDayExpense = getExpensesByDateRangeQueryResult[i];

            dayWiseExpenses.push({
                date: oneDayExpense.date,
                totalexpense: Object.values(oneDayExpense.expenses).reduce((a,b) => a + b)
            });
        }

        return {
            data: dayWiseExpenses
        }
    }
    catch (error) {
        return {
            message: error
        }
    }
}

export const updateOneDayExpenseService = async (date, payload) => {
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