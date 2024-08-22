import config from "./config";

interface RabbitMQConfig{
    rabbitMQ:{
        url:string;
        queues:{
            adminQueue:string
        };
    };
}
const RabbitMQConfig:RabbitMQConfig={
    rabbitMQ:{
        url : config.RABBITMQ_URL,
        queues:{
            adminQueue: 'admin_queue',
        }
    }
}

export default  RabbitMQConfig