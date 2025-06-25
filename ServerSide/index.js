const express = require('express')
const app = express()
const env = require('dotenv');
env.config();
const PORT = process.env.PORT || 3000
const db = require('./DataBase/db')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const ProductRoutes = require('./Routes/ProductRoutes')
const userRoutes = require('./Routes/UserRoutes')
const PaymentRoutes = require('./Routes/PaymentRoutes')
const orderRoutes = require('./Routes/OrderRoutes')
const bodyParser = require('body-parser')
const path = require('path')
const multer = require('./Multer/multer');


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', express.static('uploads'));

app.use(cookieParser())


const allowedOrigins = [
    'http://localhost:5173',      
    'http://localhost:3000',      
    'https://yourdomain.com',      
    'https://admin.yourdomain.com' 
];

app.use(cors({
  origin: function (origin, callback) {
    // allow requests with no origin (like curl or Postman)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('CORS blocked for: ' + origin));
    }
  },
  credentials: true
}));


app.use('/api/v1', ProductRoutes)
app.use('/api/v1', userRoutes)
app.use('/api/v1', orderRoutes)
app.use('/api/v1', PaymentRoutes)



app.listen(PORT, (err) => {
    if (!err) {
        console.log(`Server Running  http://localhost:${PORT}`);
    } else {
        console.log("Server Not Connected", err);
    }
})