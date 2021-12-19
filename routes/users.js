const express = require("express");
const router = express.Router();
const usersController=require("../controllers").users;
router.get('/reset',usersController.reset);
router.post('/addUser',usersController.addUser);
router.put('/updateInfo/:userId',usersController.updateInfo);
router.get('/getUser/:customId',usersController.getUser);

module.exports=router;