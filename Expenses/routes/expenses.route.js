import express from "express";
import { 
    addExpenseController,
    getExpensesController,
    getCurrentMonthlTotalExpenses,
    getExpensesByDateRangeController,
    updateOneDayExpenseController
} from "../controllers/expenses.controller.js";

const router = express.Router();

router.post("/addExpense", addExpenseController);
router.get("/getExpenses", getExpensesController);
router.get("/getCurrentMonthExpenses", getCurrentMonthlTotalExpenses);
router.post("/getExpensesByDateRange", getExpensesByDateRangeController);
router.post("/updateExpense", updateOneDayExpenseController);

export const expensesRouter = router;