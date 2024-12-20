'use client';
import s from './index.module.scss';
import {
    Button,
    ListBox, ListBoxItem as AriaListBoxItem, ListBoxItemProps,
    Popover,
    Select as AriaSelect,
    SelectProps as AriaSelectProps,
    SelectValue,
    Text,
    ValidationResult
} from 'react-aria-components';
import Label from '@/components/ui/label';
import {CaretUpDown} from '@phosphor-icons/react/dist/ssr';
import {FieldError} from '@/components/ui/field-error';


export interface SelectProps<T extends object>extends Omit<AriaSelectProps<T>, 'children' | 'onSelectionChange'> {
    label?: string;
    description?: string;
    errorMessage?: string | ((validation: ValidationResult) => string);
    items?: Iterable<T>;
    children?: React.ReactNode | ((item: T) => React.ReactNode);
    grow?: boolean;
    onSelectionChange?: (key: number | null) => void;

}

export function Select<T extends object>({ label, description, errorMessage, children, className, isRequired, onSelectionChange, items, grow = false, ...props } : SelectProps<T>) {
    return (
        <AriaSelect onSelectionChange={onSelectionChange ? (key) => onSelectionChange(key as number | null) : undefined} isRequired={isRequired} {...props} className={`${s.select} ${grow && s.grow} ${className}`}>
            <Label isRequired={isRequired}>{label}</Label>
            <Button className={s.button}>
                <SelectValue className={s.value} />
                <CaretUpDown className={s.icon} />
            </Button>
            {description && <Text slot="description">{description}</Text>}
            <FieldError>{errorMessage}</FieldError>
            <Popover className={s.popover} offset={9}>
                <ListBox className={s.listBox} items={items}>
                    {children}
                </ListBox>
            </Popover>
        </AriaSelect>
    );
}

export function SelectItem(props: ListBoxItemProps) {
    return (
        <AriaListBoxItem className={s.listBoxItem} {...props} />
    );
}