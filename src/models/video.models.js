import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const videoSchema= new Schema({
    // id:{
    //     type:Schema.Types.ObjectId,
    //     ref:"user"
    // },
    videoFile:{
        type:String, //Cloudnary
        required:true
    },
    thumbnail:{
        type:String,
        req:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    duration:{
        type:Number,
        required:true
    },
    viewa:{
        type:Number,
        default:0
    },
    isPublished:{
        type:Boolean,
        default:true,
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"user"
    }
},{timestamps:true})

videoSchema.plugin(mongooseAggregatePaginate)
export const Video= mongoose.model("video",videoSchema)