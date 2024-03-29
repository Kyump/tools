// @flow
import type {
	BasicContainerType,
	BasicInputType,
} from '@capcar/final-form-generator/src/types';

//
// Start of common types
export type OptionType = {|label: string, value: any|};

export type VariantType = 'standard' | 'outlined' | 'filled';

export type LabelPlacementType = 'end' | 'start' | 'top' | 'bottom';
// End of common types

//
// Start of fields
export type CheckboxFieldType = BasicInputType<'checkbox'>;

export type CheckboxGroupFieldType = $ReadOnly<{|
	...BasicInputType<'checkbox-group'>,
	options: OptionType[],
	labelPlacement?: LabelPlacementType,
	row?: boolean,
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
	labelPlacement?: LabelPlacementType,
	row?: boolean,
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
		| 'datetime-local'
		| 'time'
		| 'date',
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

//
// Start of containers
export type ContainerType = $ReadOnly<{|
	...BasicContainerType<'container'>,
	Component?: React$Node,
	columns?: number,
|}>;

type ConditionType = {|
	...BasicContainerType<'condition'>,
	predicate: (value: any) => boolean,
|};
type GroupFieldType = ContainerType | ConditionType;
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

export type MuiFormPropsType<T> = {
	fields: $ReadOnlyArray<T>,
	onSubmit: (values: Object) => any,
	initialValues?: Object,
	columns?: number,
	rows?: number,
	renderSubmit?: (params: RenderSubmitParamsType) => React$Element<*>,
	preValidate: (values: Object) => {[string]: string},
	devMode?: boolean,
	children?: React$Element<any>,
	customValidationSchema?: Object,
	preValidate?: (values: Object) => Object,
};
// End of components props

// Start of hook props
export type UseMuiFinalFormGeneratorPropsType<T> = {
	customDefaultValidation: (name: string) => ?Object,
	+fields: $ReadOnlyArray<T>,
	customValidationSchema?: Object,
	preValidate: (values: Object) => {[string]: string},
	customRenderInput: (params: {
		field: T,
		children?: Array<React$Node>,
		index: number,
	}) => ?React$Node,
};
// End of hook props
