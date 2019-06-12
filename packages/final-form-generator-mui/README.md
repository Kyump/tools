# Final Form Generator MUI

Final Form Generator MUI is an implementation of
[@kyump/final-form-generator](https://www.npmjs.com/package/@kyump/final-form-generator)
with [Material UI v4](https://material-ui.com/).

## Installation

You need some dependencies in order to use this package:

- [@kyump/final-form-generator](https://www.npmjs.com/package/@kyump/final-form-generator)
- [@material-ui/core](https://www.npmjs.com/package/@material-ui/core)
- [@material-ui/icons](https://www.npmjs.com/package/@material-ui/icons)
- [@material-ui/styles](https://www.npmjs.com/package/@material-ui/styles)

## Usage

Here a small [example](https://codesandbox.io/embed/kyumpfinal-form-generator-mui-example-5pwc2)

## API

### MuiForm
The main component of the package.

- fields - $ReadOnlyArray<[FieldType](src/types.js#L97-L97)> (**required**) : Fields of the forms
- onSubmit - (values: Object) => any (**required**) : Submit callback of the form
- initialValues - Object : Initial values of the form
- columns - number : columns number of the form [grid](https://css-tricks.com/snippets/css/complete-guide-grid/)
- rows - number : rows number of the form [grid](https://css-tricks.com/snippets/css/complete-guide-grid/)
- renderSubmit - (params: [RenderSubmitParamsType](src/types.js#L101-L106)) => React$Element : custom render for submit button
- preValidate - (values: Object) => {[string]: string} : Function than can be called before yup validation
- devMode - boolean: true to display erros and values of the form
- children - React$Element: Children of the form
- customValidationSchema - Object: Yup base schema is you want to use noSortEdges for example.

```javascript
const customValidationSchema = Yup.object().shape({
    customer: Yup.object().shape({}, ['phone', 'email']),
});
```
Here, if you put validation on field customer.email or customer.phone it will be add to this shape.

- preValidate - (values: Object) => Object: Function than can be called before yup validation. It has the form values as param and should return an object with error message (```{[string]: string}```)

### useMuiFormGenerator

This hook is used to extends MuiForm in association with FormComponent.

- customDefaultValidation - (name: string) => ?Object (**required**): Function used to extend or override the validation
- fields - $ReadOnlyArray<T> (**required**): The fields of the form
- customValidationSchema : cf [MuiForm](#L22-L22)
- preValidate : cf [MuiForm](README.md#L22-L22)
- customRenderInput - (params: {
     field: T,
     children?: Array<React$Node>,
    index: number,
}) => ?React$Node : Function used to extend or override MUI renderInput

### FormComponent

This component is used to extends MuiForm in association with FormComponent.

- decorators: Decorators for decorators props of [react-final-form](https://github.com/final-form/react-final-form) component
- dom: Inputs of the form (React$Node[])
- validate: Validation function for validate props of [react-final-form](https://github.com/final-form/react-final-form) component
- onSubmit : cf [MuiForm](#L26-L26)
- initialValues : cf [MuiForm](#L27-L27)
- columns : cf [MuiForm](#L28-L28)
- rows : cf [MuiForm](#L29-L29)
- renderSubmit : cf [MuiForm](#L30-L30)
- devMode : cf [MuiForm](#L31-L31)
- children : cf [MuiForm](#L32-L32)

### Fields

[MuiForm](README.md#L22-l22) have [inputs](src/types.js#L18-L18) already implemented.

## License
[MIT](https://choosealicense.com/licenses/mit/)
