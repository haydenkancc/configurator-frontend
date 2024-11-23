'use client'
import s from './index.module.scss';
import {
    FieldError,
    Input,
    Text,
    TextField as AriaTextField,
    TextFieldProps,
    ValidationResult
} from 'react-aria-components';

import Label from '../label';

interface MyTextFieldProps extends TextFieldProps {
    label?: string;
    description?: string;
    errorMessage?: string | ((validation: ValidationResult) => string);
    grow?: boolean;
}

export function TextField({ label, description, errorMessage, className, isRequired, grow = false, ...props} : MyTextFieldProps) {
    return (
        <AriaTextField className={`${s.textField} ${grow && s.grow} ${className}`} {...props}>
            <Label isRequired={isRequired}>{label}</Label>
            <Input className={s.input}/>
            {description && <Text slot="description">{description}</Text>}
            <FieldError className={s.fieldError}>{errorMessage}</FieldError>
        </AriaTextField>
    )
}