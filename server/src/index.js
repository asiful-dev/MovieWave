import dotenv from "dotenv"
import { app } from "./app.js"
import connectToDB from "./db/index.js"

dotenv.config({
    path: "./env"
});

const port = process.env.PORT || 3000;

connectToDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`🌐 Server is running on port: ${port}`);
        })
    })
    .catch((err) => {
        console.log("Mongodb Connection Failed: ", err);

    })


export default app;