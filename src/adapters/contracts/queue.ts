export interface QueueContract {
  get(exchange: string, queue: string, routingKey: string): Promise<any>;
  send(exchange: string, routingKey: string, data: any): Promise<void>;
  count(queue: string): Promise<number>;
  deleteQueue(queue: string): Promise<void>;
}