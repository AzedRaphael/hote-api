require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();
const connectDB = require("./database/connect");
const propertyRoute = require("./routes/property_routes");
const morgan = require("morgan");
const fileUpload = require("express-fileupload");
const cors = require("cors")
const cloudinary = require("cloudinary").v2

//middleware
app.use(express.json());
app.use(morgan("tiny"));
const notFoundMiddleware = require("./middleware/not-found");
const errorHandler = require("./middleware/error_handler");

//here the url is pointing to our servers
app.use(express.static("./public"));
app.use(fileUpload());
app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH']
}));

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET 
})

app.use("/api/v1/property", propertyRoute);


//routes
app.get('/', (req,res)=>{
    res.send("Real estate api");
})
app.use(notFoundMiddleware);
app.use(errorHandler);


const port = process.env.PORT || 5000;

const start = async()=>{
    try{
        await connectDB(process.env.MONGO_URL)
        app.listen(port, console.log(`server listening to port ${port}`));
    }catch(error){
        console.log(error);
    }
};

start();