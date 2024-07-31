const express = require("express");
const router = express.Router();

const { saveForm, fetchform, deleteform, getFormByUser, fetchByUniqueUrl, getFormsByFolder, updateTheme, updateForm } = require("../controllers/Form.controller");

const { auth } = require("../middleware/auth");

const updateViewCount = require("../middleware/viewCount");

router.post("/saveform", auth, saveForm);

router.get("/fetchform/:formId", fetchform);

router.delete("/deleteform/:id", auth, deleteform);

router.get('/user/:userId', getFormByUser);

router.get('/fetchByUniqueUrl/:uniqueUrl', updateViewCount, fetchByUniqueUrl);

router.get('/folder/:folderId', getFormsByFolder);

router.put('/updateTheme/:formId', auth, updateTheme);

router.put("/updateform/:formId", auth, updateForm);

module.exports = router;