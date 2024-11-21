import mongoose from "mongoose";

export interface IAdmin{
    _id:string
    name : string;
    email: string;
    password : string;
}