import { AdminService } from "../../application/use--case/admin";
import * as grpc from '@grpc/grpc-js'

export interface IAdminRequest{
    email:string;
    password:string;
}
export interface IAdminResponse{
    _id:string
    email:string;
    name:string;
}
 class AdminController{
    private adminService : AdminService;
    constructor(){
        this.adminService = new AdminService();
    }
    async adminLogin(
        call:grpc.ServerUnaryCall<IAdminRequest,IAdminRequest>,callback:grpc.sendUnaryData<{adminData?:IAdminResponse}>):Promise<void>{
        try{
            const {email,password} =call.request;
            console.log('got inside the admin controller for login');
             await this.adminService.adminLogin({email,password},callback)
        }catch(error){
            console.log('error in admin login in admincontroller')
        }
    }
}

export const admincontroller = new AdminController();