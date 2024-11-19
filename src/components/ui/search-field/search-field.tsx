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
import Label from '@/components/ui/label';
import {MagnifyingGlass, X} from '@phosphor-icons/react/dist/ssr';

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
                <Button type='submit' className={s.button}><MagnifyingGlass weight="bold" className={s.buttonIcon}/></Button>
                <Input className={s.input} placeholder={placeholder} />
                <Button type='reset' className={s.button}><X weight="bold" className={s.buttonIcon} /></Button>
            </Group>
            {description && <Text slot="description">{description}</Text>}
            <FieldError>{errorMessage}</FieldError>
        </AriaSearchField>
    );
}