import { 
    addExpenseService,
    getOneDayExpenseService,
    getCurrentMonthTotalExpensesService,
    getCurrentMonthDailyExpensesService,
    getExpensesByDateRangeService,
    updateOneDayExpenseService
} from "../services/expenses.service.js";

export const addExpenseController = async (req, res) => {
    try {
        const payload = {
            date: new Date(req.body.date)/1000,
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

export const getOneDayExpenseController = async (req, res) => {
    try {
        const date = new Date(req.body.date)/1000;

        const getOneDayExpenseServiceResult = await getOneDayExpenseService(date);
        return res.status(200).json(
            getOneDayExpenseServiceResult
        );
    }
    catch (error) {
        return res.status(500).json({
            error: error
        })
    }
}

export const getCurrentMonthlTotalExpenses = async (req, res) => {
    try {
        const getCurrentMonthDailyExpensesServiceResult = await getCurrentMonthTotalExpensesService();

        return res.status(200).json({
            expenses: getCurrentMonthDailyExpensesServiceResult?.data
        });
    }
    catch (error) {
        return res.status(500).json({
            error: error
        });
    }
}

export const getCurrentMonthDailyExpensesController = async (req, res) => {
    try {
        const getCurrentMonthDailyExpensesServiceResult = await getCurrentMonthDailyExpensesService();

        return res.status(200).json(
            getCurrentMonthDailyExpensesServiceResult?.data
        )
    }
    catch (error) {
        return res.status(500).json({
            error: error
        })
    }
}

export const getExpensesByDateRangeController = async (req, res) => {
    try {
        const getExpensesByDateRangeServiceResult = await getExpensesByDateRangeService(req.body.startdate, req.body.enddate);

        return res.status(200).json(
            getExpensesByDateRangeServiceResult?.data
        );
    }
    catch (error) {
        return res.status(500).json({
            error: error
        })
    }
}

export const updateOneDayExpenseController = async (req, res) => {
    try {
        const date = new Date(req.body.date)/1000;

        let payload = req.body;

        await updateOneDayExpenseService(date, payload);

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
