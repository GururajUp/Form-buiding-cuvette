const express = require("express");
const router = express.Router();

const {saveForm,fetchform,deleteform,getFormByUser} = require("../controllers/form.controller")

const{auth}=require("../middleware/auth")


router.post("/saveform",auth,saveForm)


router.get("/fetchform/:formId",fetchform)


router.delete("/deleteform/:id",auth, deleteform);

router.get('/user/:userId', getFormByUser);


module.exports=router