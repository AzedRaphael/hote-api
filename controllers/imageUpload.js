
    const image = async(req,res)=>{
        if(!req.files){
            throw new CustomApiError.BadRequestError("No file uploaded")
        }
        const productImage = req.files.image;
        
        if(!productImage.mimetype.startsWith("image")){
            throw new CustomApiError.BadRequestError("Please upload image")
        }
        const maxSize = 1024*1024
        if(productImage.size > maxSize){
            throw new CustomApiError.BadRequestError("Please upload image smaller than 1MB")
        }
        const imagePath = path.join(__dirname, "../public/uploads/" + `${productImage.name}`)
        await productImage.mv(imagePath)
        // res.status(StatusCodes.OK).json({image: `/uploads/${productImage.name}`})
        const img =`/uploads/${productImage.name}`
        return img
    }
    
module.exports = {image}