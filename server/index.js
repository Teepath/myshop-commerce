require("dotenv").config();
const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const helmet = require("helmet");
const rateLimit = require('express-rate-limit')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const swaggerUi = require('swagger-ui-express')
const hpp = require('hpp')
// const { S3Client } = require("@aws-sdk/client-s3");
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const { Upload } = require("@aws-sdk/lib-storage");
const multer = require("multer");
// const multerS3 = require("multer-s3");
const connectDB = require("./config/db");
const swaggerDocs = require('./swagger.json');

const productRoutes = require("./routes/productRoutes");
const passwordResetRoutes = require("./routes/passwordReset");
const payStackGateway = require("./routes/paymentRoute");
const loginAuth = require("./routes/login");
const registerAuth = require("./routes/auth");
const userAuth = require("./routes/user");
const paymentRoute = require("./routes/paymentRoute");

const app = express();
// Enable trust proxy
app.set('trust proxy', 'loopback'); // Trust only the loopback addresses (127.0.0.1, ::1)
 // Trust the first proxy (directly in front of your app)

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(cors());
connectDB();

app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`Request to ${req.originalUrl} took ${duration}ms`);
  });
  next();
});

// Limit requests from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
})
app.use('/api', limiter)

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }))

// Data sanitization against NoSQL query injection
app.use(mongoSanitize())


// Data sanitization against XSS
app.use(xss())

// Prevent parameter pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
)



const options = {
  customCss:
    ".swagger-container .swagger-ui { max-width: 1100px; margin: auto; } .swagger-ui .topbar { display: none } .swagger-ui { background: #00000e6; }",
  customSiteTitle: "SENSIBLE API",
};


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})




  // Upload an image
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'uploads', // Folder name in Cloudinary
      allowed_formats: ['jpg', 'png', 'jpeg'], // Allowed file formats
    },
  });

  const upload = multer({ storage });

// File upload route
// app.post("/api/upload", upload.single("file"), (req, res) => {
//   try {
//     res.status(200).json({
//       message: "File uploaded successfully!",
//       fileUrl: req.file.location, // S3 file URL
//     });
//   } catch (err) {
//     res.status(500).json({ message: "Failed to upload file", error: err.message });
//   }
// });

// API Endpoint to handle file uploads
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  console.log(req.file.path, 'url path')
  res.status(200).json({ url: req.file.path }); // Return the file URL
});

// Define API routes
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs, options));
app.use('/api/products', productRoutes);
app.use('/api/payment', payStackGateway);
app.use('/api/login', loginAuth);
app.use('/api/register', registerAuth);
app.use('/api/users', userAuth);
app.use('/api/users/password', passwordResetRoutes);
app.use('/api/users/payment', paymentRoute);
app.use('/api/users/verify', paymentRoute);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server now listening at ${port}`));
