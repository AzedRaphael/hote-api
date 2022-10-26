const {StatusCodes} = require("http-status-codes")

const errorHandler = (err,req,res,next)=>{
    let customError = {
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || "Something went wrong try again later"
    }
    
    //object.keys defines the key/property of the object while err.keyvalue.email gives the value of the email key.
    //duplicate error  checks if the user exists in the database
    if(err.code && err.code === 11000){
        customError.msg = `${Object.keys(err.keyValue)} has been used, please enter another valid one`
        customError.statusCode = 400
    }

    //validtion error checks if the email and password was provided
    if(err.name === "ValidationError"){
        customError.msg = Object.values(err.errors).map((item)=>item.message).join(",")
        customError.statusCode = 400
    }
    //cast error checks if the id syntax matches with what the db has
    if(err.name === "CastError"){
        customError.msg = `No item found with this id- ${err.value} `
        customError.statusCode = 404
    }
    
    //return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({err})
    return res.status(customError.statusCode).json({msg:customError.msg})
}

module.exports = errorHandler