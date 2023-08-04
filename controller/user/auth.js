import  jwt  from "jsonwebtoken";
import bcrypt from "bcrypt";
import userdb from '../../model/user.js';
import { response } from "express";

const signuptoken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1hr",
    });
};

//create sign up

export const createSignup = async (req, res) => {
    const response = {
        status:401,
        message:'Something went wrong',
        data:{},
        success: false
    }
    console.log(req.body);

    try {
        const {fullname, email, phone, password, confirmPassword } = req.body;
        const userExist = await userdb.findOne({ email: email });
    
        if(!userExist){
            const hashedpassword = await bcrypt.hash(password, 10);
            const user = new userdb({
                fullname,
                email,
                phone,
                password: hashedpassword,
            });
            let token;
            user.save().then((data) => {
                token = signuptoken(data._id);
                
                response.message = 'user added successfully'
                response.status = 200;
                response.data = user;
                response.success = true;
                res.status(200).json({response ,token});
            })
        }else{
            response.message = "user already exists"
            response.status = 200
            res.status(200).json(response)
        }
    } catch (error) {
        if(error) {response.message = "internal server error",response.success = false}
        res.status(500).json(response)
    }
};


export const createLogin = async (req, res) => {
    try {

        const response = {
            status:401,
            message:'Something went wrong',
            data:{},
            success: false
        }

        const { email, password } = req.body;
        const user = await userdb.findOne({ email: email },{isAdmin:0,cart:0,createdAt:0,updatedAt:0})
        console.log(user)
        if (user) {
            const data = bcrypt.compare(password, user.password);
            if (data) {
                let token = signuptoken(user._id);
                response.success=true;
                response.message = 'User logged in successfully'
                user.password = undefined;
                response.data ={user,token}
                res.status(200).json(response);
            }
        } else {
            response.success = false;
            response.message = 'user not found'
            res.status(200).json(response);
        }
    } catch (error) {
        response.success = false;
        response.message = 'Internal server error'
        res.status(500).json(response);
    }
};