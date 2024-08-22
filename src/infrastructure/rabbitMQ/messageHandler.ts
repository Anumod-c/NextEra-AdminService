import { admincontroller } from '../../interface/controllers/adminController';
import RabbitMQClient from './client';

export default class MessageHandlers{
    static async handle(operations:string,data:any,correlationId:string,replyTo:string){
        let response;
        switch(operations){
            case 'admin_login':
                console.log("Handling operation",operations,data);
                response= await admincontroller.adminLogin(data);
                console.log("data reached inside message handler.ts",response);              
                break;
                
        }
        await RabbitMQClient.produce(response,correlationId,replyTo)
    }
}