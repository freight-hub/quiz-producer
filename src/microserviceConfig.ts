import { KafkaOptions, Transport } from '@nestjs/microservices';

export const microserviceConfig: KafkaOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: 'quiz-producer',
      brokers: ['pkc-4r297.europe-west1.gcp.confluent.cloud:9092'],
      ssl: true,
      sasl: {
        mechanism: 'plain',
        username: '2XQ5Z2BKJ6QBNF57',
        password:
          'KwuTojMW+ly//AsS/hTjuKt9ZcElv/eL4KqePReSxPA+nff1n7oDUUZG2c713CL0',
      },
    },
  },
};
