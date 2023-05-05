require("dotenv").config()
const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const helmet= require("helmet");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const passwordResetRoutes = require("./routes/passwordReset");
const payStackGateway =require("./routes/paymentRoute");
const loginAuth = require("./routes/login")
const registerAuth = require("./routes/auth")
const userAuth = require("./routes/user");
const paymentRoute =require("./routes/paymentRoute");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy:'cross-origin'}));
app.use(cors());
connectDB();
app.use('/api/products', productRoutes)
app.use('/api/payment', payStackGateway)
app.use('/api/login', loginAuth);
app.use('/api/register', registerAuth);
app.use('/api/users', userAuth)
app.use('/api/users/password', passwordResetRoutes)
app.use('/api/users/payment', paymentRoute)
app.use('/api/users/verify', paymentRoute)



const port = process.env.PORT || 5000;

app.listen(port,() => console.log(`Server now listent at ${port}`)
);