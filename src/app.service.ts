import {
  Injectable,
  OnApplicationBootstrap,
  OnApplicationShutdown,
} from '@nestjs/common';
import { readFileSync } from 'fs';
import { join } from 'path';
import { Client, ClientKafka } from '@nestjs/microservices';
import { microserviceConfig } from './microserviceConfig';

@Injectable()
export class AppService implements OnApplicationBootstrap {
  @Client(microserviceConfig)
  client: ClientKafka;

  async onApplicationBootstrap(): Promise<any> {
    const producer = await this.client.connect();

    const rawdata = readFileSync(join(process.cwd(), './data/full.json'));
    const data = JSON.parse(rawdata.toLocaleString());
    for (const event of data) {
      event.timestamp = new Date(event.timestamp);
      console.log('');
      await producer.send({
        topic: 'large-quiz',
        messages: [
          {
            key: event.payload.quiz_id, // Distribute to partitions based on quiz_id
            value: JSON.stringify(event),
          },
        ],
      });
    }
  }
}
