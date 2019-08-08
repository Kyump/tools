// @flow

import type {FieldType} from './types';

export const useRenderVariantFields = ({
	fields,
	variant,
}: {
	// $FlowFixMe
	fields: Array<FieldType>,
	variant: string,
}): Array<FieldType> => {
	fields.map(field => {
		if (
			![
				'container',
				'condition',
				'checkbox',
				'checkbox-group',
				'radio',
				'radio-group',
			].includes(field.type)
		) {
			// $FlowFixMe
			field.variant = variant;
			return field;
		}
		if (['container', 'condition'].includes(field.type) && field.fields) {
			// $FlowFixMe
			field.fields = useRenderVariantFields({fields: field.fields, variant});
			return field;
		}
		return field;
	});
	return fields;
};
