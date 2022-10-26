const multer = require("multer")
const cloudinary = require("cloudinary").v2

const uploads = async(req,res)=>{
    const result = await cloudinary.uploader.upload(req.files.image.tempFilePath, {
        use_filename:true,folder:"file-upload"
    })
    //this unlinks/removes the temp image path after uploading to cloudinary
    fs.unlinkSync(req.files.image.tempFilePath);
    //send the url that points to the cloudinary
    //return res.status(StatusCodes.OK).json({image:{src:result.secure_url}})

}

module.exports = uploads

