import express from 'express';
import config from '../config/config';
import {databaseConnection} from '../database/mongodb'
import RabbitMQClient from '../rabbitMQ/client'
import { startGrpcServer } from '../grpc/client/grpcServer';
const app = express();
app.use(express.json());
const startServer = async ()=>{
    try{
        startGrpcServer();
        await databaseConnection();
        RabbitMQClient.initialize()
    const port =config.port;

        app.listen(port,()=>{
            console.log("user service running on port",port)
        })
    }catch(error){
        console.log("Error in stareting user service")
    }
}

startServer()