# Final Form Generator

Final Form Generator is a simple [hook](https://reactjs.org/docs/hooks-intro.html) for computing props for [react-final-form](https://github.com/final-form/react-final-form) component.

## Installation

You need some depedencies in order to use this hook:

- [final-form](https://github.com/final-form/final-form)
- [final-form-calculate](https://github.com/final-form/final-form-calculate)
- [react-final-form](https://github.com/final-form/react-final-form)
- [yup](https://github.com/jquense/yup)

Then you can run:

```bash
npm install @kyump/final-form-generator
```

## Usage

```javascript
import React from 'react';
import * as Yup from 'yup';
import {Form, Field} from 'react-final-form';
import useFormGenerator from '@kyump/final-form-generator';

const fields = [
    {
        type: 'text',
        name: 'text',
        label: 'text',
    },
    {
        type: 'email',
        name: 'email',
        label: 'email',
    },
];

const renderInput = ({field, children = [], index}) => {
    switch (field.type) {
        case 'email':
            return (
                <Field
                key={index}
                    name={field.name}
                    component="input"
                    type="email"
                    placeholder={field.label}
                />
            );
        case 'text':
            return (
                <Field
                    key={index}
                    name={field.name}
                    component="input"
                    type="text"
                    placeholder={field.label}
                />
            );
        default:
            return <span key={key}>{`${field.type} not handled`}</span>;
    }
};

export const defaultValidation = (type?: string) => {
    switch (type) {
        case 'email':
            return Yup.string()
                .email()
                .required();
        default:
            return Yup.string()
                .trim()
                .required();
    }
};

const ExampleForm = () => {
	const {dom, validate, decorators, loading} = useFormGenerator({
		defaultValidation,
		fields,
		renderInput,
	});
	return loading ? (
		'Chargement'
	) : (
		<Form
			decorators={decorators}
			onSubmit={values => alert(values)}
			validate={validate}
			render={({
				handleSubmit,
				form,
				submitting,
				pristine,
				invalid,
				values,
				errors,
			}) => (
				<form onSubmit={handleSubmit}>
					<div>
						{dom}
						<button type="submit" disabled={invalid || submitting || pristine}>
							Submit
						</button>
					</div>
					<pre>{JSON.stringify(values, 0, 2)}</pre>
					<pre>{JSON.stringify(errors, 0, 2)}</pre>
				</form>
			)}
		/>
	);
};

export default ExampleForm;
```

## API

[UseFinalFormGeneratorProps](src/types.js#L37-L46) :

- defaultValidation (**required**): Function the take type of the field and return its default [yup](https://github.com/jquense/yup) validation
- fields (**required**): Array of [fields](src/types.js#L6-L14)
- renderInput (**required**): Function used to render elements of the form. It takes an object with 3 props *field* ([BasicFieldInterface]( src/types.js#L6-L14)), its *children* (?React$Node[]) and the index of the field in the fields array
- customValidationSchema?: Yup base schema is you want to use noSortEdges for example.

```javascript
const customValidationSchema = Yup.object().shape({
    customer: Yup.object().shape({}, ['phone', 'email']),
});
```
Here, if you put validation on field email or phone it will be add to this shape.
- preValidate: Function than can be called before yup validation. It has the form values as param and should return an object with error message (```{[string]: string}```)


[UseFinalFormGeneratorResult](src/types.js#L48-L53) :

- decorators: Decorators for decorators props of [react-final-form](https://github.com/final-form/react-final-form) component
- dom: Inputs of the form (React$Node[])
- validate: Validation function for validate props of [react-final-form](https://github.com/final-form/react-final-form) component

## License
[MIT](https://choosealicense.com/licenses/mit/)