// @flow

// export type CityFieldType = {
// 	type: 'city',
// } & BasicFieldType;
//
// export type SelectFieldType = {
// 	type: 'select',
// 	value?: string, // les inputs ne veulent pas de boolean ou d'undefined en value
// 	options: Array<{label: string, value: any}>,
// } & BasicFieldType;
//
// export type MutliSelectFieldType = {
// 	type: 'multi-select',
// 	value?: Array<string>, // les inputs ne veulent pas de boolean ou d'undefined en value
// 	options: Array<{label: string, value: any}>,
// } & BasicFieldType;

import type {
	BasicContainerType,
	BasicInputType,
} from '@kyump/final-form-generator/src/types';

export type CheckboxFieldType = $ReadOnly<{|
	...BasicInputType<'checkbox'>,
	value?: string, // les inputs ne veulent pas de boolean ou d'undefined en value
|}>;

export type StandardFieldType = $ReadOnly<{|
	...BasicInputType<
		| 'checkbox'
		| 'radio'
		| 'file'
		| 'text'
		| 'phone'
		| 'email'
		| 'number'
		| 'password'
		| 'date'
		| 'datetime'
		| 'time',
	>,
	value?: string, // les inputs ne veulent pas de boolean ou d'undefined en value
|}>;

type SimpleFieldType = $ReadOnly<CheckboxFieldType | StandardFieldType>;

// export type DateSelectFieldType = {
// 	type: 'date-select' | 'date-time-select',
// 	value?: string, // les inputs ne veulent pas de boolean ou d'undefined en value
// 	options: Array<{label: string, value: any}>,
// } & BasicFieldType;
//
// type SimpleFieldType =
// 	| StandardFieldType
// 	| SelectFieldType
// 	| MutliSelectFieldType
// 	| CheckboxFieldType
// 	| DateSelectFieldType;
//
// type GroupFieldType = {
// 	type: 'group',
// 	row?: boolean,
// 	fields: Array<FieldType>, // eslint-disable-line no-use-before-define
// } & BasicFieldType;
//
// type ConditionType = {
// 	type: 'condition',
// 	name: string,
// 	predicate: (value: any) => boolean,
// 	fields: Array<FieldType>, // eslint-disable-line no-use-before-define
// };
//

// Group
type ContainerType = $ReadOnly<{|
	...BasicContainerType<'container'>,
	columns?: number,
|}>;

type GroupFieldType = $ReadOnly<ContainerType>;

export type FieldType = SimpleFieldType | GroupFieldType;
