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


interface MyNumberFieldProps extends NumberFieldProps {
    label?: string;
    description?: string;
    errorMessage?: string | ((validation: ValidationResult) => string);
    grow?: boolean;
}

export default function NumberField({ label, description, errorMessage, className, isRequired, isReadOnly, grow = false, ...props }: MyNumberFieldProps) {
    return (
        <AriaNumberField isRequired={isRequired} className={`${s.numberField} ${grow && s.grow} ${className}`} isReadOnly={isReadOnly} {...props}>
            <Label isRequired={isRequired}>{label}</Label>
            <Group className={s.group} data-readonly={isReadOnly}>
                <Button className={s.button} slot="decrement"><Minus weight="bold" className={s.buttonIcon}/></Button>
                <Input size={1} className={s.input}/>
                <Button className={s.button} slot="increment"><Plus weight="bold" className={s.buttonIcon}/></Button>
            </Group>
            {description && <Text slot="description">{description}</Text>}
            <FieldError>{errorMessage}</FieldError>
        </AriaNumberField>
    );
}