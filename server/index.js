require("dotenv").config()
const express = require("express");
const cors = require("cors");
const helmet= require("helmet");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");

app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:'cross-origin'}));
app.use(cors());
connectDB();
const app = express();

app.use(express.json());
app.use('/api/products', productRoutes)

const port = process.env.PORT || 5000;

app.listen(port,() => console.log(`Server now listent at ${port}`)
);