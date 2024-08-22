import mongoose,{Document,Types,Schema} from "mongoose";

import { IAdmin } from "../domain/entities/IAdmin";

export interface IAdminDocument extends IAdmin,Document {
    _id:Types.ObjectId;
}



const adminSchema :Schema = new Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type: String,
        required:true,
        unique:true
    },
    phone:{
        type: Number,
    },
    password:{
        type: String,
        required: true
    },
    created_at:{
        type:Date,
        required:true,
        default:Date.now
    }
})


export const Admin = mongoose.model<IAdminDocument>('Admin',adminSchema);