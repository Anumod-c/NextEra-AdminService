import mongoose from "mongoose";

export interface IAdmin{
    name : string;
    email: string;
    phone?:string;
    password : string;
    profilePicture? : string;
    created_at? :Date;
}