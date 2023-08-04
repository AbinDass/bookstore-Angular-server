import express from "express";
import { createLogin, createSignup } from "../controller/user/auth.js";
import { addToCart, deleteCart, listCart } from "../controller/user/cart.js";
import  {tokenCheck}  from "../middleware/checkAuthentication.js";
const router = express.Router();

router.post("/createsignup", createSignup);
router.post("/createlogin", createLogin);

router.post("/addtocart", tokenCheck, addToCart)
router.get("/listcart",tokenCheck, listCart)
router.post("/removecart", tokenCheck, deleteCart)

export default router;