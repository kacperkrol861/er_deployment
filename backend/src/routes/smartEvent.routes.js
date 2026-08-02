const express=require("express");


const router=express.Router();


const authMiddleware =
require("../middleware/auth.middleware");


const {

getSmartEvent

}=require("../controllers/smartEvent.controller");




router.get(

"/smart-event/:id",

authMiddleware,

getSmartEvent

);



module.exports=router;