// @flow
import * as Yup from 'yup';
import toPath from 'lodash.topath';

const findNestedSchema = (schema, path) => {
	try {
		return Yup.reach(schema, path);
	} catch (e) {
		return Yup.object();
	}
};

const baseSet = (rootSchema, path: Array<string>, value) => {
	const key = path.shift();
	if (path.length !== 0) {
		const nestedSchema = findNestedSchema(rootSchema, key);
		return rootSchema.shape({[key]: baseSet(nestedSchema, path, value)});
	}
	return rootSchema.shape({[key]: value});
};

export const setValidation = (
	rootSchema: Object = Yup.object(),
	path: string,
	value: Object,
) => {
	const pathValues = toPath(path);
	const result = baseSet(rootSchema, pathValues, value);
	return result;
};
