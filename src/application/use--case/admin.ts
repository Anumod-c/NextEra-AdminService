import { AdminRepository } from "../../domain/AdminRepository";
import { IAdmin } from "../../domain/entities/IAdmin";

import config from "../../infrastructure/config/config";


export class AdminService{
    private adminRepo : AdminRepository

    constructor(){
        this.adminRepo = new AdminRepository();
    }

   async adminLogin(email:string,password:string):Promise<any>{
    try{
        console.log('reached inside adminlogin usecase',email,password);
        const result  =  await this.adminRepo.checkAdmin(email,password)
        console.log(result,'result from check user');
        
        return result
        
    }catch(error){
        console.log('Error in adminLogin in usecase');
        
    }
   }

}