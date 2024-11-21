import { IAdmin } from "./entities/IAdmin";
import { Admin } from "../model/Admin";
import { IAdminRepository } from "./repositories/IAdminRepository";
import mongoose from "mongoose";



export class AdminRepository implements IAdminRepository{
    async checkAdmin(email: string):Promise<{ success: boolean; message: string; adminData?: IAdmin }> {
        try {
            const admin = await Admin.findOne({ email: email }).lean();
            
            if (!admin) {
                return { success: false, message: "Admin not found" };
            }
            const adminData:IAdmin={
                ...admin,_id:admin._id.toString(),
            }
            return { success: true, message: "Admin found", adminData };
    
        } catch (error) {
            console.log("error in admin login",error)
            return { success: false, message: "An error occurred" };
        }
        
    }
}