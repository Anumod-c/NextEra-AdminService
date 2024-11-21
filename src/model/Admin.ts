import mongoose,{Document,Types,Schema} from "mongoose";

import { IAdmin } from "../domain/entities/IAdmin";

export interface IAdminDocument extends Omit<IAdmin, '_id'>,Document{_id:mongoose.Types.ObjectId} {
    
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
   
    password:{
        type: String,
        required: true
    },

})


export const Admin = mongoose.model<IAdminDocument>('Admin',adminSchema);