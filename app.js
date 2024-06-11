import express from "express";
import 'dotenv/config';
import { expensesRouter } from "./Expenses/routes/expenses.route.js";

const app = express();
app.use(express.json());

app.use("/api/expenses", expensesRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
})