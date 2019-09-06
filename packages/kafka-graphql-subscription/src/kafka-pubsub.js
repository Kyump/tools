// @flow
import {PubSubEngine} from 'graphql-subscriptions';
import {Kafka} from 'kafkajs';
import uuidv4 from 'uuid/v4';
import retry from 'async-retry';

import KafkaPubSubIterator from './kafka-pubsub-iterator';
import {logger} from './logger';

const ERROR_TYPES = ['unhandledRejection', 'uncaughtException'];
const SIGNAL_TRAPS = ['SIGTERM', 'SIGINT', 'SIGUSR2'];

type KafkaPubSubOptionsType = {
	topic: string,
	hosts: string[],
};

class KafkaPubSub implements PubSubEngine {
	channelSubscriptions: {[string]: Array<number>}; // {[channel: string]: Array<number>};

	consumer: Object;

	options: any;

	producer: Object;

	subIdCounter: number;

	isReady: boolean = false;

	subscriptionMap: {[number]: [string, Function]};

	constructor(options: KafkaPubSubOptionsType) {
		this.options = options;
		this.subscriptionMap = {};
		this.channelSubscriptions = {};
		this.subIdCounter = 0;
		this._initConsumerAndProducer(this.options.topic, this.options.hosts)
			.then(() => {
				logger.info('Connection to Kafka successful.');
				this.isReady = true;
			})
			.catch(e => {
				logger.error('Error during the connection to Kafka.', e);
				process.exit(-1);
			});
	}

	_initConsumerAndProducer = async (topic: string, hosts: string[]) => {
		const kafka = new Kafka({
			clientId: 'kafka-graphql-subscription',
			brokers: hosts,
			maxRetryTime: 2,
		});

		try {
			const consumer = kafka.consumer({groupId: uuidv4()});

			await consumer.connect();
			await consumer.subscribe({topic});
			await consumer.run({
				eachMessage: async ({topic: topicName, partition, message}) => {
					logger.debug(
						'[eachMessage] topic: %s | partition: %s | message: %O',
						topicName,
						partition,
						message,
					);
					const parsedMessage = JSON.parse(message.value.toString());
					if (parsedMessage.channel) {
						const {channel, ...payload} = parsedMessage;
						this.onMessage(parsedMessage.channel, payload);
						// No channel abstraction, publish over the whole topic
					} else {
						this.onMessage(this.options.topic, parsedMessage);
					}
				},
			});

			this.consumer = consumer;
		} catch (e) {
			logger.error(`Error on creation of the consumer: ${e.message}`);
			throw e;
		}

		try {
			const producer = kafka.producer();

			await producer.connect();

			this.producer = producer;
		} catch (e) {
			logger.error(`Error on creation of the consumer: ${e.message}`);
			throw e;
		}

		ERROR_TYPES.forEach(type => {
			process.on(type, async () => {
				try {
					logger.error(`process.on ${type}`);
					await this.consumer.disconnect();
					await this.producer.disconnect();
					logger.error(`Consumer and producer disconnected on ${type}.`);
					process.exit(0);
				} catch (e) {
					logger.error('Cannot disconnect producer or consumer: ', e);
					process.exit(1);
				}
			});
		});

		SIGNAL_TRAPS.forEach(type => {
			process.once(type, async () => {
				try {
					await this.consumer.disconnect();
					await this.producer.disconnect();
					logger.error(`Consumer and producer disconnected on ${type}.`);
				} finally {
					process.kill(process.pid, type);
				}
			});
		});
	};

	asyncIterator<T>(triggers: string | Array<string>): AsyncIterator<T> {
		return retry(async () => {
			if (!this.isReady) {
				throw new Error('Pubsub is not initialised.');
			}
			return new KafkaPubSubIterator<T>(this, triggers);
		});
	}

	onMessage(channel: string, message: Object) {
		const subscriptions = this.channelSubscriptions[channel];
		if (subscriptions) {
			subscriptions.forEach(subId => {
				const [, listener] = this.subscriptionMap[subId];
				listener(message);
			});
		} // no subscribers, don't publish msg
	}

	async publish(payload: Object) {
		return retry(async () => {
			if (!this.isReady) {
				throw new Error('Pubsub is not initialised.');
			}
			return this.producer.send({
				topic: this.options.topic,
				messages: [{value: payload}],
			});
		});
	}

	subscribe(channel: string, onMessage: Function): Promise<number> {
		this.subIdCounter++;
		this.subscriptionMap[this.subIdCounter] = [channel, onMessage];
		this.channelSubscriptions[channel] = [
			...(this.channelSubscriptions[channel] || []),
			this.subIdCounter,
		];
		return Promise.resolve(this.subIdCounter);
	}

	unsubscribe(index: number) {
		const [channel] = this.subscriptionMap[index];
		this.channelSubscriptions[channel] = this.channelSubscriptions[
			channel
		].filter(subId => subId !== index);
		delete this.subscriptionMap[index];
	}
}

export default KafkaPubSub;
