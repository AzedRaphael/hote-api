const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
    hname:{
        type:String,
        trim:true,
        required:[true, "Please provide hotels name"],
        maxlength:[100, "Name can not be more than 100 characters"]
    },
    country:{
        type:String,
        required:[true,"Please provide country"]
    },
    city:{
        type:String,
        required:[true, "Please provide city"]
    },
    address:{
        type:String,
        required:[true,"Please provide address"],
        maxlength:[1000, "Address can not be more than 1000 characters"]
    },
    image:{
        type:String,
        required:[true]
    },
    group:{
        type:String,
        required:[true, "Please provide hotel group"]
    }
    
},{timestamps:true})

const Property = mongoose.model("property", PropertySchema)
module.exports = Property