// @flow
import type {BasicFieldType} from '@capcar/final-form-generator/src/types';
import type {FieldType} from '@capcar/final-form-generator-mui/src/types';

type CustomType = $ReadOnly<{|
	...BasicFieldType<'custom'>,
	customField: string,
|}>;

export type CustomFieldType = FieldType | CustomType;
