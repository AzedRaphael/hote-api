const Property = require("../models/PropertyModel")
const {StatusCodes} = require("http-status-codes")
const CustomApiError =require("../errors")
const path = require("path")
const cloudinary =  require("cloudinary")
//const {image}= require("./imageUpload");


//only admins can create property
const createProperty = async(req,res)=>{
    //the user in the property model will be passed from the req.user(authenticate User MW)
    //req.body.user  = req.user.userId;

    //req.body.image = image()
    // console.log(image)

    const {hname, country, city, address, group, image} = req.body;
    const hotelExist = await Property.findOne({hname})
    if(hotelExist){
        throw new CustomApiError.BadRequestError("Hotel name exists")
    }
    const property = await Property.create({hname, country, city, address, group, image})
    res.status(StatusCodes.CREATED).json(property)
}
const getAllProperties = async(req,res)=>{
    const property = await Property.find({})
    res.status(StatusCodes.OK).json({property, count:property.length})
}

const getSingleProperty = async(req,res)=>{
    //rey.params.id is received from the browser. {id:propertyId} means propertyId is an alias of id from params
    const {id:propertyId} = req.params
    
    const property = await Property.findOne({_id: propertyId})
    if(!property){
        throw new CustomApiError.NotFoundError("No property found")
    }
    res.status(StatusCodes.OK).json(property)
}

//only admins can update property
const updateProperty = async(req,res)=>{
    const {params:{id:propertyId}}= req
    const property = await Property.findOneAndUpdate({_id:propertyId}, req.body, {new:true, runValidators:true})
    if(!property){
        throw new CustomApiError.NotFoundError(`No product with id ${propertyId} was found`)
    }
    if(!req.body){
        throw new CustomApiError.BadRequestError("No field should be empty")
    }
    res.status(StatusCodes.OK).json(property)
}

//only admins can delete property
const deleteProperty = async(req,res)=>{
    const {id:propertyId} = req.params

    const property = await Property.findOneAndDelete({_id:propertyId})
    if(!property){
        throw new CustomApiError.NotFoundError(`No product with id ${propertyId} was found`)
    }
    await property.remove()
    res.status(StatusCodes.OK).json({msg: "property removed"})
}

const uploadImage = async(req,res)=>{
    const result = await cloudinary.uploader.upload(
        
        req.files.image.tempFilePath,
        {
            use_filename: true,
            folder: "hotel-ranking"
        }
    )
    return res.status(StatusCodes.OK).json({image: {src: result.secure_url}})
}

module.exports = {uploadImage,createProperty, getAllProperties,getSingleProperty,updateProperty,deleteProperty}
