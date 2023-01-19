import { config } from "dotenv";
config();

export default {
  hostname: process.env.RABBITMQ_HOSTNAME,
  port: process.env.RABBITMQ_PORT,
  username: process.env.RABBITMQ_USER,
  password: process.env.RABBITMQ_PASS
}
