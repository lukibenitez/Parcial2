// src/app.ts
import express from "express";
import bodyParser from "body-parser";
import dotenv from 'dotenv';
import playersRouter from './routes/players';

import loginRouter from "./routes/login";
import protectedRouter from "./routes/protected";
import todosRouter from './routes/todos';

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.use("/", playersRouter);
app.use("/", loginRouter);
app.use("/", protectedRouter);
app.use("/", todosRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
