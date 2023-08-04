import { json } from "express";
import userdb from "../../model/user.js";

export const addToCart = async (req,res) =>{
    let response = {
        data:{},
        status:401,
        succes:false,
        error:'something went wrong'
    }

    try {
        const {title, subtitle, isbn13, price, image, url} = req.body.book;
        const data = res.locals.jwt_user;
        let userid = data.id;
        let user =await userdb.find({_id:userid})
        if(user){
            let newItem = {
                title:title,
                subtitle:subtitle,
                isbn13:isbn13,
                price:price,
                image:image,
                url:url
            }
            let updatedCart = await userdb.findOneAndUpdate({_id:userid},{$push:{cart:newItem}},{new:true})
            response.data = updatedCart;
            response.succes = true;
            response.status = 200
         res.status(200).json(response)
        }else{
            response.error = 'user not found'
        }
    } catch (error) {
        if (error){
            console.log(error)
            response.error = "internal server error"
            response.status = 500
            
            res.status(500).json(response)
        }
    }
}

export const listCart = async (req, res) => {
   let response = {
    data:[{}],
    status:401,
    success:false,
    error:'something went wrong'
    }
try {
    const data = res.locals.jwt_user;
        let userid = data.id;
    let user = await userdb.find({_id:userid})
    if(user){
        let userCart = user[0].cart
        console.log(userCart,'aaa')
        response.success = true;
        response.status = 200
        response.data = userCart;
        res.status(200).json(response)
    }else{
        response.status = 403
        response.error = 'user not found'
        res.status(200).json(response)
    }
} catch (error) {
    if(error){
        console.log(error)
        response.error = "internal server error";
        response.status = 500
        res.status(500).json(response)
    }
}
};

export const deleteCart =async (req, res) => {
    let response = {
        data:{},
        status:401,
        success:false,
        error:'something went wrong'
        }
    try {
        console.log(req.body,'dsfsd')
        
        const data = res.locals.jwt_user;
        let userid = data.id;
        const productId = req.body.product
        console.log(productId)
        const datas = await userdb.findOneAndUpdate({_id:userid},{$pull:{cart:{_id:productId}}},{new:true});
        console.log(datas)
            response.status = 200;
            response.success = true;
            response.data = datas;
            res.status(200).json(response);
        
    } catch (error) {
        if (error){
            console.log(error)
            response.error = "internal server error"
            response.status = 500
            res.status(500).json(response);
        }
    }
};