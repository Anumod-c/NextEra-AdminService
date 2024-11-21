import { IAdmin } from "../entities/IAdmin";

export interface IAdminRepository {
    checkAdmin(email: string): Promise<{ success: boolean; message: string; adminData?: IAdmin }>;
}