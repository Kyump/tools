// @flow
import React from 'react';
import {Field} from 'react-final-form';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import {makeStyles} from '@material-ui/styles';
import type {VariantType} from '../types';

const useStyles = makeStyles(theme => ({
	button: {
		width: '100%',
	},
	imgPreview: {
		width: '100%',
	},
	input: {
		display: 'none',
	},
	rightIcon: {
		marginLeft: theme.spacing(1),
	},
}));

const ImagePreview = ({value, label, classes}) => (
	<img
		src={typeof value === 'object' ? URL.createObjectURL(value) : value}
		alt={label}
		className={classes.imgPreview}
	/>
);

type PropsType = {
	label: string,
	name: string,
	value?: string,
	variant?: VariantType,
	disabled?: boolean,
	withPreview?: boolean,
};

const FormFile = ({
	label,
	variant = 'outlined',
	withPreview,
	disabled,
	...props
}: PropsType) => (
	<Field {...props} type="file">
		{({input: {name, value, onChange, ...restInput}, meta, ...rest}) => {
			const classes = useStyles({value});
			const id = `${name}-file`;
			return (
				<FormControl {...rest} fullWidth error={meta.error && meta.touched}>
					<input
						{...restInput}
						onChange={({
							target: {
								validity,
								files: [file],
							},
						}) => {
							if (validity) onChange(file);
						}}
						className={classes.input}
						id={id}
						name={name}
						type="file"
					/>
					<label htmlFor={id}>
						{withPreview && value && (
							<ImagePreview classes={classes} label={label} value={value} />
						)}
						<Button
							variant={variant}
							disabled={disabled}
							className={classes.button}
							component="span"
						>
							{value ? value.name : label}
							<CloudUploadIcon className={classes.rightIcon} />
						</Button>
					</label>
				</FormControl>
			);
		}}
	</Field>
);

export default FormFile;
