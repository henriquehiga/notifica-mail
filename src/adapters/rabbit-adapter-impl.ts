import cfg from "@/config/queue-config";
import amqp, { Channel, Connection } from "amqplib";
import { QueueContract } from "./contracts/queue";

export class RabbitAdapterImpl implements QueueContract {
  private connection: Connection;
  public channel: Channel;

  constructor() { }

  async deleteQueue(queue: string): Promise<void> {
    try {
      await this.connect();
      await this.channel.deleteQueue(queue);
      await this.close();
    } catch(err) {
      throw new Error();
    }
  }

  private async connect() {
    try {
      let credentials = `amqp://${cfg.username}:${cfg.password}@${cfg.hostname}:${cfg.port}`;
      const connection = await amqp.connect(credentials);
      this.connection = connection;
      this.channel = await this.connection.createChannel();
    } catch(err) {
      throw new Error();
    }
  }

  public async send(exchange: string, routingKey: string, data: any) {
    try {
      await this.connect();
      await this.channel.assertExchange(exchange, 'direct', { durable: true });
      const payload = data;
      this.channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(payload)));
      await this.close();
    } catch(err) {
      throw new Error();
    }
  }

  public async ack(message: any) {
    try {
      this.channel.ack(message);
    } catch(err) {
      throw new Error();
    }
  }

  public async get(exchange: string, queue: string, routingKey: string) {
    try {
      await this.connect();
      await this.channel.assertExchange(exchange, 'direct', { durable: true });
      await this.channel.assertQueue(queue, { durable: true });
      await this.channel.prefetch(20);
      await this.channel.bindQueue(queue, exchange, routingKey);
      let data = [];
      await this.channel.consume(queue, async (msg) => {
        if (msg) {
          data.push(msg.content.toString());
          this.channel.ack(msg);
        }
      });
      await this.close();
      return data;
    } catch(err) {
      throw new Error();
    }
  }

  public async count(queue: string) {
    try {
      await this.connect();
      const queueInfo = await this.channel.checkQueue(queue);
      await this.close();
      return queueInfo.messageCount;
    } catch(err) {
      throw new Error();
    }
  }

  public async close() {
    try {
      await this.channel.close();
      await this.connection.close();
    } catch(err) {
      throw new Error();
    }
  }
}
