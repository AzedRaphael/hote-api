const express = require("express");
const router = express.Router()
const {createProperty, getAllProperties,getSingleProperty,updateProperty,deleteProperty,uploadImage} = require("../controllers/property_ctrls")

router
    .route("/")
    .get(getAllProperties)
router
    .route("/create-property")
    .post(createProperty)

router
    .route("/upload-image")
    .post(uploadImage)
router
    .route("/:id")
    .get(getSingleProperty)
    .delete(deleteProperty)
    .patch(updateProperty)

module.exports = router