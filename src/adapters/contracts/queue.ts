export interface QueueContract {
  get(queue: string, length: number): Promise<any[]>;
  send(queue: string, data: any): Promise<void>;
  count(queue: string): Promise<number>;
  listen(queue: string, length: number, callback: Function): Promise<void>;
  deleteQueue(queue: string): Promise<void>;
}