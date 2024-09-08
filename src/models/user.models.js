import mongoose,{Schema} from "mongoose"
import { JsonWebTokenError  }  from "jsonwebtoken"
import bcrypt from "bcrypt"
const userschema= new Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
    },
    fullname:{
        type:String,
        required:true,
        lowercase:true,
        trim:true,
        index:true
    },
    Avatar:{
        type:String,    //cloud services refered by hitesh Sir
        required:true
    },
    coverimage:{
        type:String
    },
    watchHistory:[
        {
            type:Schema.Types.ObjectId,
            ref:"video"
        }
    ],
    password:{
        type:String,
        required:[true,"Password is required"]
    },
    refreshTokes:{
        type:String
    }
},{timestamps:true})

userschema.pre("save", async function(next){
    if(!this.ismodified("password")) return next();

    this.password= bcrypt.hash(this.password,10)
    next()
})

userschema.methods.isPasswordCorrect= async function(password){
    return await bcrypt.compare(password,this.password)
}
userschema.methods.generteAccessToken= function(){
    return jwt.sign(
        {
            _id:this._id,
            email:this.email,
            username:this.username
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userschema.methods.generateRefreshToken= function(){
    return jwt.sign(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User= mongoose.model("user",userschema)