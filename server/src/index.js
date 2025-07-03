import dotenv from "dotenv"
import connectToDB from "./db/index.js"
import { app } from "./app.js";

dotenv.config({
    path: "/.env"
});

const port = process.env.PORT || 4000;

connectToDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`🌐 Server is running on port: ${port}`);
        })
    })
    .catch((error) => {
        console.log(`MongoDB Connection Failed!!: `, error);
    })

export default app;

