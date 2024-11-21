import { AdminRepository } from "../../domain/AdminRepository";
import { IAdmin } from "../../domain/entities/IAdmin";
import * as grpc from '@grpc/grpc-js'
import bcrypt from 'bcryptjs'

import config from "../../infrastructure/config/config";
import { IAdminResponse } from "../../interface/controllers/adminController";


export class AdminService{
    private adminRepo : AdminRepository

    constructor(){
        this.adminRepo = new AdminRepository();
    }

   async adminLogin({email,password}:{email:string,password:string},callback:grpc.sendUnaryData<{success:boolean,message:string,adminData?:IAdmin}>):Promise<void>{
    try{
        console.log('reached inside adminlogin usecase',email,password);
         const { success, message, adminData }   =  await this.adminRepo.checkAdmin(email);
        if (!success || !adminData) {
            return callback(null, { success: false, message });
        }
        
         const isPasswordMatch =  await bcrypt.compare(password,adminData.password);
         if(!isPasswordMatch){
                console.log("passord is incorrrect");
                return callback(null,{ success: false, message: "Incorrect Credentials" })
                
            } 
                console.log("Login succesful")
                return callback(null,{ success: true, message: "Login successfull",adminData });
        
    }catch(error){
        console.log('Error in adminLogin in usecase');
        return callback(null,{ success: false, message: "Login successfull", });

    }
   }

}