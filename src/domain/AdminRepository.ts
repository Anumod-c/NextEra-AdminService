import { IAdminRepository } from "./repositories/IAdminRepository";

import { IAdmin } from "./entities/IAdmin";
import bcrypt from 'bcryptjs'

import { Admin } from "../model/Admin";


export class AdminRepository implements IAdminRepository{
    async checkAdmin(email: string, password: string): Promise<{ success: boolean; message: string; adminData?: IAdmin; }> {
        const adminData = await Admin.findOne({email:email});

        if(!adminData){
            return { success: false, message: "Email incorrect" };
        }
        const isPasswordMatch =  await bcrypt.compare(password,adminData.password);
        if(!isPasswordMatch){
            console.log("passord is incorrrect");
            return { success: false, message: "Login unsuccesfull" }
            
        } else {
            console.log("Login succesful")
            return { success: true, message: "Login successfull",adminData };
        }
    }
}