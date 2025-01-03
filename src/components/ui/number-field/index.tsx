'use client';
import s from './index.module.scss';
import {
    Button,
    Group,
    Input,
    NumberField as AriaNumberField,
    NumberFieldProps,
    Text,
    ValidationResult
} from 'react-aria-components';
import Label from '../label';
import {Minus, Plus} from '@phosphor-icons/react/dist/ssr'
import {FieldError} from '@/components/ui/field-error';
import {memo} from 'react';


interface MyNumberFieldProps extends Omit<NumberFieldProps, "value"> {
    label?: string;
    description?: string;
    errorMessage?: string | ((validation: ValidationResult) => string);
    placeholder?: string;
    grow?: boolean;
    value?: number | null;
}

export function NumberField({ label, placeholder, description, errorMessage, className, isRequired, isReadOnly, grow = false, value, ...props }: MyNumberFieldProps) {
    return (
        <AriaNumberField isRequired={isRequired} className={`${s.numberField} ${grow && s.grow} ${className}`} value={value ?? undefined} isReadOnly={isReadOnly} {...props}>
            <Label isRequired={isRequired}>{label}</Label>
            <Group className={s.group} data-readonly={isReadOnly}>
                <Button className={s.button} slot="decrement"><Minus weight="bold" className={s.buttonIcon}/></Button>
                <Input size={1} className={s.input} placeholder={placeholder}/>
                <Button className={s.button} slot="increment"><Plus weight="bold" className={s.buttonIcon}/></Button>
            </Group>
            {description && <Text slot="description">{description}</Text>}
            <FieldError>{errorMessage}</FieldError>
        </AriaNumberField>
    );
}