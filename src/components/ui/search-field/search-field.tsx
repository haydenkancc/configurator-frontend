'use client';
import s from './search-field.module.scss';
import {
    SearchField as AriaSearchField,
    FieldError,
    Input,
    Button,
    Text,
    SearchFieldProps,
    ValidationResult,
    Group
} from 'react-aria-components';
import Label from '@/components/label/label';
import {PiMagnifyingGlassBold, PiXBold} from 'react-icons/pi';

interface MySearchFieldProps extends SearchFieldProps {
    label?: string;
    description?: string;
    errorMessage?: string | ((validation: ValidationResult) => string);
    grow?: boolean;
    placeholder?: string;
}

export default function SearchField({ label, description, errorMessage, grow = false, placeholder = "", isRequired, value, className, ...props }: MySearchFieldProps) {
    return (
        <AriaSearchField className={`${s.searchField} ${grow && s.grow} ${className}`} {...props}>
            <Label isRequired={isRequired}>{label}</Label>
            <Group className={s.group}>
                <Button type='submit' className={s.button}><PiMagnifyingGlassBold className={s.buttonIcon}/></Button>
                <Input className={s.input} placeholder={placeholder} />
                <Button type='reset' className={s.button}><PiXBold className={s.buttonIcon} /></Button>
            </Group>
            {description && <Text slot="description">{description}</Text>}
            <FieldError>{errorMessage}</FieldError>
        </AriaSearchField>
    );
}