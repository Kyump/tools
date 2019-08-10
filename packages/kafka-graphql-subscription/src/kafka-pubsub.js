// @flow
import {PubSubEngine} from 'graphql-subscriptions';
import {ConsumerGroup} from 'kafka-node';
import uuidv4 from 'uuid/v4';

import KafkaPubSubIterator from './kafka-pubsub-iterator';
import buildKafkaConsumer from './kafka/kafka-consumer';
import KafkaProducer from './kafka/kafka-producer';

type KafkaPubSubOptionsType = {
	topic: string,
	host: string,
};

class KafkaPubSub implements PubSubEngine {
	channelSubscriptions: {[string]: Array<number>}; // {[channel: string]: Array<number>};

	consumer: ConsumerGroup;

	options: any;

	producer: KafkaProducer;

	subIdCounter: number;

	subscriptionMap: {[number]: [string, Function]};

	constructor(options: KafkaPubSubOptionsType) {
		this.options = options;
		this.subscriptionMap = {};
		this.channelSubscriptions = {};
		this.subIdCounter = 0;
		this.consumer = buildKafkaConsumer({
			host: this.options.host,
			topicName: this.options.topic,
			groupName: uuidv4(), // to get message for all node
			processMessage: message => {
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
		this.producer = new KafkaProducer();
	}

	asyncIterator<T>(triggers: string | Array<string>): AsyncIterator<T> {
		return new KafkaPubSubIterator<T>(this, triggers);
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
		return this.producer.produce(this.options.topic, payload);
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
