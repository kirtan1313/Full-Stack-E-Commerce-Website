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
const orderRoutes = require('./Routes/OrderRoutes')


app.use(express.json());
app.use(cookieParser())
app.use(cors())


app.use('/api/v1',ProductRoutes)
app.use('/api/v1',userRoutes)
app.use('/api/v1',orderRoutes)



app.listen(PORT, (err) => {
    if (!err) {
        console.log(`Server Running  http://localhost:${PORT}`);
    } else {
        console.log("Server Not Connected", err);
    }
})