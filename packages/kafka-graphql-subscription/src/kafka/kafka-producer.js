// @flow
import {HighLevelProducer, KafkaClient} from 'kafka-node';

import {logger} from '../logger';

class KafkaProducer {
	producer = null;

	id: string = '';

	constructor(id: string = 'kafka-producer') {
		this.id = id;
	}

	produce = async (topic: string, payloads: Object) => {
		const producer = await this.getProducer();
		return new Promise((resolve, reject) => {
			producer.send(
				[{topic, messages: JSON.stringify(payloads)}],
				(err, data) => {
					if (err) reject(err);
					resolve(data);
				},
			);
		});
	};

	getProducer = async () =>
		new Promise((resolve, reject) => {
			if (this.producer) {
				resolve(this.producer);
			} else {
				logger.info('Ty to connect to %s.', process.env.KAFKA_HOST);
				const client = new KafkaClient({
					kafkaHost: String(process.env.KAFKA_HOST),
				});

				const producerOptions = {
					// Configuration for when to consider a message as acknowledged, default 1
					requireAc1ks: 1,
					// The amount of time in milliseconds to wait for all acks before considered, default 100ms
					ackTimeoutMs: 100,
				};

				const newProducer = new HighLevelProducer(client, producerOptions);

				newProducer.on('error', error => {
					logger.error('Producer [%s] not created: %o.', this.id, error);
					reject(error);
				});

				newProducer.on('ready', () => {
					logger.info('Producer [%s] created.', this.id);
					this.producer = newProducer;
					resolve(newProducer);
				});
			}
		});
}

export default KafkaProducer;
