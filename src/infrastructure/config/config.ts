import dotenv from 'dotenv';

dotenv.config();


const config={
    port:parseInt(process.env.PORT as string)|| 5002,

    RABBITMQ_URL:process.env.RABBITMQ_URL ||  'amqp://localhost',

    DATABASE_URL :process.env.DATABASE_URL || 'mongodb://0.0.0.0:27017/NextEra-AdminService',

    JWT_SECRET: 'nextera@123',

    grpcPort:process.env.grpcPort,
}

export default config