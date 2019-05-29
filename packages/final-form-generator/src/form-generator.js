// @flow
// eslint-disable-next-line
import React, {useEffect, useState} from 'react';
import * as Yup from 'yup';
import {setIn} from 'final-form';

import {setValidation} from './utils';
import type {UseFinalFormGeneratorPropsType} from './types';

const validateWithYup = async (values, schema, existingErrors = {}): Object => {
	try {
		await schema.validate(values, {abortEarly: false});
		return existingErrors;
	} catch (e) {
		if (!e.inner) return existingErrors;
		return e.inner.reduce(
			(errors, error) => setIn(errors, error.path, error.message),
			existingErrors,
		);
	}
};

const computeForm = ({
	customValidationSchema,
	fields,
	renderInput,
	defaultValidation,
}) =>
	fields.reduce(
		(acc, field) => {
			// If the inputs is a group we need to traverse it
			if (field.fields) {
				const {
					dom: childrenDom,
					schema: childrenSchema,
					decorators: childrenDecorators,
				} = computeForm({
					fields: field.fields,
					renderInput,
					customValidationSchema,
					defaultValidation,
				});

				// We render the current group elemuserresoent with the computed children elements
				acc.dom.push(renderInput({field, children: childrenDom}));
				// Merge the conf of all children with the conf of the current depth level
				acc.schema = acc.schema.concat(childrenSchema);
				acc.decorators = [...acc.decorators, ...childrenDecorators];
			} else {
				// If it's not a group we just push the input into the dom
				acc.dom.push(renderInput({field}));
			}

			if (field.validation || defaultValidation(field.type)) {
				acc.schema = setValidation(
					acc.schema,
					field.name,
					field.validation ? field.validation : defaultValidation(field.type),
				);
			}

			return acc;
		},
		{
			dom: [],
			schema: customValidationSchema || Yup.object(),
			safeguardSchema: Yup.object(),
			decorators: [],
		},
	);

export const useFormGenerator = ({
	fields,
	customValidationSchema,
	// flow is crying so
	// eslint-disable-next-line no-unused-vars
	preValidate = (values: Object) => ({}),
	defaultValidation,
	renderInput,
}: UseFinalFormGeneratorPropsType) => {
	const [formProps, setFormProps] = useState({
		decorators: [],
		dom: [],
		validate: () => {},
	});

	useEffect(() => {
		// extract information from fields
		const {dom, schema, decorators} = computeForm({
			fields,
			customValidationSchema,
			defaultValidation,
			renderInput,
		});
		// validation function
		const validate = async (values: Object) => {
			const errors = await preValidate(values);
			return validateWithYup(values, schema, errors);
		};

		setFormProps({
			decorators,
			dom,
			validate,
		});
	}, [fields]);
	return formProps;
};
