// @flow
import type {
	BasicContainerType,
	BasicInputType,
} from '@kyump/final-form-generator/src/types';

//
// Start of common types
export type OptionType = {|label: string, value: any|};

export type VariantType = 'standard' | 'outlined' | 'filled';

export type LabelPlacementTye = 'end' | 'start' | 'top' | 'bottom';
// End of common types

//
// Start of fields
export type CheckboxFieldType = BasicInputType<'checkbox'>;

export type CheckboxGroupFieldType = $ReadOnly<{|
	...BasicInputType<'checkbox-group'>,
	options: OptionType[],
	labelPlacement?: LabelPlacementTye,
|}>;
export type FileFieldType = $ReadOnly<{|
	...BasicInputType<'file'>,
	withPreview?: boolean,
	variant?: VariantType,
|}>;

export type MutliSelectFieldType = $ReadOnly<{|
	...BasicInputType<'multi-select'>,
	options: OptionType[],
	native?: boolean,
	variant?: VariantType,
|}>;

export type RadioFieldType = BasicInputType<'radio'>;

export type RadioGroupFieldType = $ReadOnly<{|
	...BasicInputType<'radio-group'>,
	options: OptionType[],
	labelPlacement?: LabelPlacementTye,
|}>;

export type SelectFieldType = $ReadOnly<{|
	...BasicInputType<'select'>,
	options: OptionType[],
	native?: boolean,
	variant?: VariantType,
|}>;

export type StandardFieldType = $ReadOnly<{|
	...BasicInputType<
		| 'checkbox'
		| 'radio'
		| 'text'
		| 'email'
		| 'number'
		| 'password'
		| 'date'
		| 'datetime'
		| 'time',
	>,
	variant?: VariantType,
|}>;

type SimpleFieldType =
	| CheckboxFieldType
	| CheckboxGroupFieldType
	| FileFieldType
	| MutliSelectFieldType
	| RadioFieldType
	| RadioGroupFieldType
	| SelectFieldType
	| StandardFieldType;

// End of fields

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

//
// Start of containers
export type ContainerType = $ReadOnly<{|
	...BasicContainerType<'container'>,
	columns?: number,
|}>;

type GroupFieldType = ContainerType;
// End of containers

export type FieldType = SimpleFieldType | GroupFieldType;

//
// Start of components props
export type RenderSubmitParamsType = {
	invalid?: boolean,
	submitting?: boolean,
	pristine?: boolean,
	classes: Object,
};

export type PropsType = {
	fields: $ReadOnlyArray<FieldType>,
	onSubmit: (values: Object) => any,
	initialValues?: Object,
	update?: Object,
	// i dont get it, thoses props are used in STYLE
	columns?: number, // eslint-disable-line react/no-unused-prop-types
	rows?: number, // eslint-disable-line react/no-unused-prop-types
	renderSubmit?: (params: RenderSubmitParamsType) => React$Element<*>,
	devMode?: boolean,
	children?: React$Element<any>,
	customValidationSchema?: Object,
	preValidate?: (values: Object) => Object,
};
// End of components props
