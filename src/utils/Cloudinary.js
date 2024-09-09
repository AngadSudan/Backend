import {v2 as cloudinary } from "cloudinary"
import fs from "fs"

cloudinary.config({ 
    cloud_name: `${process.env.CLOUDINARY_CLOUD_NAME}`, 
    api_key: `${process.env.CLOUDINARY_API_KEY}`, 
    api_secret: `${process.env.CLOUDINARY_API_SECRET}`
});

const UploadonCloud= async (loaclfilepath)=>{
    try {
        if(!loaclfilepath) return null

        const response= await cloudinary.uploader.upload(loaclfilepath,{
            resource_type:"auto"
        })

        //file upload
        console.log("success", response.url);
        return response;
        
    } catch (error) {
        fs.unlinkSync(loaclfilepath)   //removes the locally saved temporary file
    }
}

export {UploadonCloud}