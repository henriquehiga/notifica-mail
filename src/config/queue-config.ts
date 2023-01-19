import { config } from "dotenv";
config();

export default {
  hostname: process.env.QUEUE_HOSTNAME,
  port: process.env.QUEUE_PORT,
  username: process.env.QUEUE_USER,
  password: process.env.QUEUE_PASS
}
