// @flow
import {$$asyncIterator} from 'iterall';
import {PubSubEngine} from 'graphql-subscriptions';

// $FlowFixMe
class KafkaPubSubIterator<T> implements AsyncIterator<T> {
	allSubscribed: Promise<Array<number>>;

	eventsArray: Array<string>;

	listening: boolean;

	pubsub: PubSubEngine;

	pullQueue: Function[];

	pushQueue: any[];

	constructor(pubsub: PubSubEngine, eventNames: string | Array<string>) {
		this.pubsub = pubsub;
		this.pullQueue = [];
		this.pushQueue = [];
		this.listening = true;
		this.eventsArray = Array.isArray(eventNames) ? eventNames : [eventNames];
		this.allSubscribed = this.subscribeAll();
	}

	emptyQueue(subscriptionIds: number[]) {
		if (this.listening) {
			this.listening = false;
			this.unsubscribeAll(subscriptionIds);
			this.pullQueue.forEach(resolve =>
				resolve({value: undefined, done: true}),
			);
			this.pullQueue.length = 0;
			this.pushQueue.length = 0;
		}
	}

	async next() {
		await this.allSubscribed;
		return this.listening ? this.pullValue() : this.return();
	}

	pullValue(): Promise<IteratorResult<any, any>> {
		return new Promise(resolve => {
			if (this.pushQueue.length !== 0) {
				resolve({value: this.pushQueue.shift(), done: false});
			} else {
				this.pullQueue.push(resolve);
			}
		});
	}

	async pushValue(message: any) {
		await this.allSubscribed;
		if (this.pullQueue.length !== 0) {
			this.pullQueue.shift()({value: message, done: false});
		} else {
			this.pushQueue.push(message);
		}
	}

	async return() {
		this.emptyQueue(await this.allSubscribed);
		return {value: undefined, done: true};
	}

	subscribeAll() {
		return Promise.all(
			this.eventsArray.map(eventName =>
				this.pubsub.subscribe(eventName, this.pushValue.bind(this)),
			),
		);
	}

	async throw(error?: any) {
		this.emptyQueue(await this.allSubscribed);
		return Promise.reject(error);
	}

	unsubscribeAll(subscriptionIds: number[]) {
		subscriptionIds.forEach(subscriptionId =>
			this.pubsub.unsubscribe(subscriptionId),
		);
	}

	// $FlowFixMe
	[$$asyncIterator]() {
		return this;
	}
}

export default KafkaPubSubIterator;
