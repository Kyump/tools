// @flow
import {ConsumerGroup} from 'kafka-node';

import {logger} from '../logger';

export type KafkaMessageType = {|
	topic: string,
	value: string,
	offset: number,
	partition: number,
	highWaterOffset: number,
	key: string,
	timestamp: Date,
|};

type ConsumerGroupPropsType = {|
	groupName: string,
	host: string,
	processMessage: (message: KafkaMessageType) => void | Promise<void>,
	topicName: string,
|};

const buildKafkaConsumer = ({
	groupName,
	host,
	processMessage,
	topicName,
}: ConsumerGroupPropsType) => {
	logger.info(
		'Consumer for topic [%s] in group [%s] is starting.',
		topicName,
		groupName,
	);

	const options = {
		// connect directly to kafka broker (instantiates a KafkaClient)
		kafkaHost: host,
		consumerId: groupName,
		// manual commit are safer for production because autocommit can skip message
		autoCommit: false,
		// autoCommitIntervalMs: 5000, not used with autoCommit: false
		commitOffsetsOnFirstJoin: false,
		sessionTimeout: 15000,
		fetchMaxBytes: 10 * 1024 * 1024, // 10 MB
		// An array of partition assignment protocols ordered by preference. 'roundrobin' or 'range' string for
		// built ins (see below to pass in custom assignment protocol)
		protocol: ['roundrobin'],
		// Offsets to use for new groups other options could be 'earliest' or 'none'
		// (none will emit an error if no offsets were saved) equivalent to Java client's auto.offset.reset
		fromOffset: 'latest',
		// how to recover from OutOfRangeOffset error (where save offset is past server retention)
		// accepts same value as fromOffset
		outOfRangeOffset: 'earliest',
	};

	const consumerGroup = new ConsumerGroup(options, topicName);

	consumerGroup.on('message', async (message: KafkaMessageType) => {
		logger.info(
			'Consumer [%s] for topic [%s] in group [%s] received the message: %o',
			consumerGroup.memberId,
			topicName,
			groupName,
			message,
		);
		try {
			await processMessage(message);
			// true force commit even if there is a commit pending
			consumerGroup.commit(true, (error, data) => {
				if (error) {
					logger.error('Could not commit message: %o.', error);
				} else {
					logger.info('Commit success: %o.', data);
				}
			});
		} catch (error) {
			logger.error('Could not handle message: %o.', message);
		}
	});

	consumerGroup.on('error', error => {
		logger.error(
			'Error on Consumer [%s] for topic [%s] in group [%s] received the message: %o',
			consumerGroup.memberId,
			topicName,
			groupName,
		);
		// handle a broker not available error
		if (error && error.name === 'BrokerNotAvailableError') {
			logger.error('Attempting reconnect...');
			consumerGroup.client.refreshMetadata(consumerGroup.topics, err => {
				logger.error('Could not reconnect: %o;', err);
			});
		} else {
			logger.error(error);
		}
	});

	consumerGroup.on('offsetOutOfRange', error => {
		logger.error('offsetOutOfRange: %o', error);
	});

	process.once('SIGINT', () => {
		// force commit offset to false because we are committing manually
		consumerGroup.close(false, () => {
			logger.info(
				'Consumer [%s] for topic [%s] in group [%s] closed.',
				consumerGroup.memberId,
				topicName,
				groupName,
			);
		});
	});
};

export default buildKafkaConsumer;
