// src/index.ts
import express from "express";
import { AppDataSource } from "./data-source";
import userRouter from "./routes/userRouter";
import postRouter from "./routes/postRouter";
import { login } from "./controller/loginController";
import { authenticateJWT } from "./middleware/loginAuth";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize the TypeORM data source

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!");
        const PORT = 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((error) => console.log(error));

app.get("/", (_req, res) => {
    res.send("Hello World!");
});

app.post('/api/login',login);
app.use('/api/users', userRouter);
app.use('/api/posts',authenticateJWT, postRouter);


