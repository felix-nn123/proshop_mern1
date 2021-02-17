import express from "express"
import dotenv from "dotenv"
import colors from "colors"
import path from 'path'
import morgan from "morgan"
import connectDB from "./config/db.js"

import {notFound, errorHandler} from "./middleware/errorMiddleware.js"
import productRoutes from "./routes/productRoute.js"
import userRoutes from "./routes/userRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import uploadRoutes from "./routes/uploadRoutes.js"



dotenv.config()

connectDB()

const app=express()

if(process.env.NODE_ENV==="development"){

app.use(morgan('dev'))

}


//allows use to accept json data in the body

app.use(express.json())

app.get("/", (req, res)=>{

res.send("API is running")

})

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/uploads", uploadRoutes)



app.get('/api/config/paypal', (req, res)=>res.send(process.env.PAYPAL_CLIENT_ID))


const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(notFound)

app.use(errorHandler)


const PORT=process.env.PORT||5000


app.listen(5000, console.log(`here is port ${PORT} in ${process.env.NODE_ENV} mode`.yellow.bold))