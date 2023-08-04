import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: Number,
        },
        password: {
            type: String,
            min: 8,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        cart:[{
            title:String,
            subtitle:String,
            price:String,
            isbn13:String,
            image:String,
            url:String, 
            quantity:{
                type: Number,
                default:1,
            }  
        }]
    },

    { timestamps: true }
);

const user = mongoose.model("User", userSchema);
export default user;
