import { Channel,connect,Connection } from "amqplib";
import RabbitMQConfig from "../config/rabbitMQ";
import Producer from "./producer";
import Consumer from "./consumer";
import rabbitMQLogger from "../../../logger/rabbitLogger";
class RabbitMQClient{
    private static instance: RabbitMQClient;
    private connection : Connection |undefined;
    private produceChannel : Channel |undefined;
    private consumerChannel : Channel | undefined;
    private consumer : Consumer |undefined;
    private producer : Producer |undefined;
    private isInitialized =false;

    private constructor(){}

    public static getInstance(){
        if(!this.instance){
            this.instance = new RabbitMQClient();

        }
        return this.instance
    }

    async initialize(){
        if(this.isInitialized){
            return
        }
        try{
            console.log("Connecting to Rabbitmq...");
            this.connection = await connect(RabbitMQConfig.rabbitMQ.url);
            rabbitMQLogger.emit('connect', `Connected to ${RabbitMQConfig.rabbitMQ.url}`);
            console.log('Line under connecting to rabbitmq');
            [this.produceChannel, this.consumerChannel] = await Promise.all([this.connection.createChannel(),this.connection.createChannel()]) ;

            await this.produceChannel.assertQueue(RabbitMQConfig.rabbitMQ.queues.adminQueue,{durable:true});
            await this.consumerChannel.assertQueue(RabbitMQConfig.rabbitMQ.queues.adminQueue,{durable:true})

            this.producer = new Producer(this.produceChannel);
            this.consumer = new Consumer(this.consumerChannel);
            this.consumer.consumeMessage();
            this.isInitialized=true
        }catch(error){
            rabbitMQLogger.emit('disconnect', error);
            console.log('error in rabbitmq initialising');
            
        }
    }

    async produce(data:any,correlationId:string,replyToQueue:string){
        if(!this.isInitialized){
            await this.initialize()
        }
        return this.producer?.produceMessage(data,correlationId,replyToQueue);

    }
}

export default RabbitMQClient.getInstance();