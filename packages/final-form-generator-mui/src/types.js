// @flow
import type {FieldType} from './fields/types';

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
