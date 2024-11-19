'use client'
import s from './index.module.scss';
import {
    Button,
    ComboBox as AriaComboBox,
    ComboBoxProps as AriaComboBoxProps,
    FieldError,
    Input,
    ListBox, ListBoxProps,
    Popover,
    Text,
    ValidationResult
} from 'react-aria-components';
import {CaretDown} from '@phosphor-icons/react/dist/ssr';
import Label from "@/components/ui/label";
import {useEffect, useRef} from 'react';

export interface ComboBoxProps<T extends object>
    extends Omit<AriaComboBoxProps<T>, 'children'> {
    label?: string;
    description?: string | null;
    errorMessage?: (validation: ValidationResult) => string;
    children?: React.ReactNode | ((item: T) => React.ReactNode)
    grow?: boolean;
}

export function ComboBox<T extends object>({ label, description, errorMessage, children, isRequired, className, grow = false, ...props }: ComboBoxProps<T>) {
    return (
        <AriaComboBox {...props} className={`${s.comboBox} ${grow && s.grow} ${className}`}>
            <Label isRequired={isRequired}>{label}</Label>
            <div className={s.container}>
                <Input className={s.input}/>
                <Button className={s.button}><CaretDown weight="fill" className={s.icon} /></Button>
            </div>
            {description && <Text slot="description">{description}</Text>}
            <FieldError>{errorMessage}</FieldError>
            <Popover className={s.popover} offset={9} placement="bottom left">
                <ListBox className={s.listBox} onAction={(key) => console.log(key)}>
                    {children}
                </ListBox>
            </Popover>
        </AriaComboBox>
    )
}