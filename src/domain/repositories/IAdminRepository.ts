import { IAdmin } from "../entities/IAdmin";

export interface IAdminRepository{
    checkAdmin(email:string,password:string):Promise<{ success: boolean, message: string ,adminData?:IAdmin}>;
}