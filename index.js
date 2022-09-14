import  express  from "express";
import fileUpload from "express-fileupload";
import cors from "cors";
import productRoute from "./routes/productRoute.js"

const app = express();

app.use(cors())
app.use(express.json())
app.use(fileUpload())
app.use(productRoute)

app.listen(5001,()=> console.log("Server Up and  Running..."))