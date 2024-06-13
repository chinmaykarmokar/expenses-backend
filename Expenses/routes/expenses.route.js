import express from "express";
import { 
    addExpenseController,
    getExpensesController,
    getCurrentMonthlTotalExpenses,
    getCurrentMonthDailyExpensesController,
    getExpensesByDateRangeController,
    updateOneDayExpenseController
} from "../controllers/expenses.controller.js";

const router = express.Router();

router.post("/addExpense", addExpenseController);
router.get("/getExpenses", getExpensesController);
router.get("/getCurrentMonthTotalExpenses", getCurrentMonthlTotalExpenses);
router.get("/getCurrentMonthDailyExpenses", getCurrentMonthDailyExpensesController);
router.post("/getExpensesByDateRange", getExpensesByDateRangeController);
router.post("/updateExpense", updateOneDayExpenseController);

export const expensesRouter = router;