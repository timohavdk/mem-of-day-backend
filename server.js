import express from "express";
import "dotenv/config";
import { ROUTES } from "./routes/routes.js";
import { imageRouter } from "./routes/imageRouter.js";

const server = express();

server.use(ROUTES.images, imageRouter);

server.listen(process.env, () => {
    console.log(`Server start on http://localhost:${process.env.PORT}`);
});