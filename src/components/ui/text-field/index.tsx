'use client'
import s from './index.module.scss';
import {
    Input,
    Text,
    TextField as AriaTextField,
    TextFieldProps,
    ValidationResult
} from 'react-aria-components';

import Label from '../label';
import {FieldError} from '@/components/ui/field-error';

interface MyTextFieldProps extends Omit<TextFieldProps, "value"> {
    label?: string;
    description?: string;
    errorMessage?: string | ((validation: ValidationResult) => string);
    grow?: boolean;
    value?: string | null
}

export function TextField({ label, description, errorMessage, className, isRequired, value, grow = false, ...props} : MyTextFieldProps) {
    return (
        <AriaTextField isRequired={isRequired} className={`${s.textField} ${grow && s.grow} ${className}`} value={value ?? undefined} {...props}>
            <Label isRequired={isRequired}>{label}</Label>
            <div className={s.inputWrapper}>
                <Input className={s.input}/>
            </div>
            {description && <Text slot="description">{description}</Text>}
            <FieldError>{errorMessage}</FieldError>
        </AriaTextField>
    )
}