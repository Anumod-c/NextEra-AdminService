import { AdminService } from "../../application/use--case/admin";

 class AdminController{
    private adminService : AdminService;
    constructor(){
        this.adminService = new AdminService();
    }
    async adminLogin(data:any){
        try{
            const {email,password} =data;
            console.log('got inside the admin controller for login');
            const result = await this.adminService.adminLogin(email,password)
           return result            
        }catch(error){
            console.log('error in admin login in admincontroller')
        }
    }
}

export const admincontroller = new AdminController();