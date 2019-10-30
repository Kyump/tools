// @flow
import {type Decorator} from 'final-form';

type FieldUpdate = {[string]: (fieldValue: any, formValues: Object) => any};

export interface BasicFieldInterface {
	+name: string;
	+type: string;
	+style?: Object;
	+validation?: Object;
	+fields?: $ReadOnlyArray<BasicFieldInterface> | void;
	+label?: string;
	+updates?: FieldUpdate;
}

export type BasicFieldType<T: string> = {|
	name: string,
	type: T,
	style?: Object,
	validation?: Object,
	fields?: $ReadOnlyArray<BasicFieldType<*>>,
	label?: string,
|};

export type BasicInputType<T: string> = $ReadOnly<{|
	...BasicFieldType<T>,
	label: string, // un input DOIT avoir un label
|}>;

// eslint-disable-next-line no-use-before-define
export type BasicContainerType<T: string> = $ReadOnly<{|
	...BasicFieldType<T>,
	fields: $ReadOnlyArray<BasicFieldInterface>,
	label?: string,
|}>;

export type UseFinalFormGeneratorPropsType = {
	defaultValidation: (name: string) => Object,
	+fields: $ReadOnlyArray<BasicFieldInterface>,
	customValidationSchema?: Object,
	preValidate: (values: Object) => {[string]: string},
	renderInput: (params: {
		field: BasicFieldInterface,
		children?: Array<React$Node>,
		index: number,
	}) => React$Node,
};

export type UseFinalFormGeneratorResultType = {
	dom: React$Node[],
	validate: (values: FormData) => Object | Promise<Object> | typeof undefined,
	decorators: Decorator<Object>[],
	loading: boolean,
};
