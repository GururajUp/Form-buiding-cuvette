const express = require("express");
const router = express.Router();

const {saveForm,fetchform,deleteform}=require("../controllers/form.controller")

const{auth}=require("../middleware/auth")


router.post("/saveform",auth,saveForm)


router.get("/fetchform/:formId",fetchform)


router.delete("/deleteform/:id",auth, deleteform);


module.exports=router