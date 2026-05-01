import express from "express";
import path from "node:path";
import { fileURLToPath } from "url";
import "dotenv/config";
import session from "express-session";
import ConnectPgSimple from "connect-pg-simple";



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pgSession = new ConnectPgSimple(session);
const PORT = process.env.PORT || 3000;

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));




app.listen(PORT, (err) => {
    if (err) {
        throw err;
    }
    console.log(`Server Live on ${PORT}`);
})