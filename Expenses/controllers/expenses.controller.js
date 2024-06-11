import { 
    addExpenseService,
    getExpensesService,
    getCurrentMonthTotalExpenses,
    getExpensesByDateRange,
    updateOneDayExpense
} from "../services/expenses.service.js";

export const addExpenseController = async (req, res) => {
    try {
        const payload = {
            date: req.body.date,
            expenses: req.body.expenses
        }
    
        const addExpenseServiceResult = await addExpenseService(payload);
    
        return res.status(200).json({
            message: addExpenseServiceResult.message
        })
    }
    catch (error) {
        return res.status(500).json({
            error: error
        });
    }
}

export const getExpensesController = async (req, res) => {
    try {
        const getExpensesServiceResult = await getExpensesService();
        return res.status(200).json({
            data: getExpensesServiceResult?.data
        })
    }
    catch (error) {
        return res.status(500).json({
            error: error
        });
    }
}

export const getCurrentMonthlTotalExpenses = async (req, res) => {
    try {
        const getCurrentMonthTotalExpensesServiceResult = await getCurrentMonthTotalExpenses();

        return res.status(200).json({
            expenses: getCurrentMonthTotalExpensesServiceResult?.data
        });
    }
    catch (error) {
        return res.status(500).json({
            error: error
        });
    }
}

export const getExpensesByDateRangeController = async (req, res) => {
    try {
        const getExpensesByDateRangeServiceResult = await getExpensesByDateRange(req.body.startdate, req.body.enddate);

        return res.status(200).json({
            expenses: getExpensesByDateRangeServiceResult?.data
        });
    }
    catch (error) {
        return res.status(500).json({
            error: error
        })
    }
}

export const updateOneDayExpenseController = async (req, res) => {
    try {
        const date = req.body.date;

        let payload = req.body;

        const updateOneDayExpenseServiceResult = await updateOneDayExpense(date, payload);
        console.log(updateOneDayExpenseServiceResult);

        return res.status(200).json({
            message: "Successful."
        })
    }
    catch (error) {
        return res.status(500).json({
            error: error
        })
    }
}
