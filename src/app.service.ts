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

    const rawdata = readFileSync(join(process.cwd(), './data/basic.json'));
    const data = JSON.parse(rawdata.toLocaleString());
    for (const event of data) {
      event.timestamp = new Date(event.timestamp);
      await producer.send({
        topic: 'playing_with_projections_events',
        messages: [
          {
            value: JSON.stringify(event),
          },
        ],
      });
    }
  }
}
