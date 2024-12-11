'use client'
import s from './index.module.scss';
import {
    Button,
    ComboBox as AriaComboBox,
    ComboBoxProps as AriaComboBoxProps, ComboBoxStateContext,
    Input as AriaInput, InputProps,
    ListBox, ListBoxItem as AriaListBoxItem, ListBoxItemProps, ListBoxProps,
    Popover,
    Text,
    ValidationResult
} from 'react-aria-components';
import {CaretDown} from '@phosphor-icons/react/dist/ssr';
import Label from "@/components/ui/label";
import {useContext, useEffect, useRef} from 'react';
import {useComboBoxState} from 'react-stately';
import {FieldError} from '@/components/ui/field-error';

export interface ComboBoxProps<T extends object>
    extends Omit<AriaComboBoxProps<T>, 'children'> {
    label?: string;
    description?: string | null;
    errorMessage?: (validation: ValidationResult) => string;
    children?: React.ReactNode | ((item: T) => React.ReactNode)
    placeholder?: string;
    grow?: boolean;
}

export function ComboBox<T extends object>({ label, description, placeholder, errorMessage, children, isRequired, className, grow = false, ...props }: ComboBoxProps<T>) {

    return (
        <AriaComboBox  isRequired={isRequired} {...props} className={`${s.comboBox} ${grow && s.grow} ${className}`} menuTrigger="focus" shouldFocusWrap>
            <Label isRequired={isRequired}>{label}</Label>
            <div className={s.container}>
                <Input className={s.input} size={1} placeholder={placeholder}/>
                <Button className={s.button}><CaretDown weight="fill" className={s.icon} /></Button>
            </div>
            {description && <Text slot="description">{description}</Text>}
            <FieldError>{errorMessage}</FieldError>
            <Popover className={s.popover} offset={9} placement="bottom left">
                <ListBox className={s.listBox}>
                    {children}
                </ListBox>
            </Popover>
        </AriaComboBox>
    )
}

function Input({...props} : InputProps) {
    let context = useContext(ComboBoxStateContext);

    return (
        <AriaInput {...props} onKeyDown={(e)=> {
            if (e.key == 'Enter') {
                e.preventDefault();
                if(context.selectionManager.focusedKey === null) {
                    context.selectionManager.setFocusedKey(context.collection.getFirstKey());
                    context.setSelectedKey(context.collection.getFirstKey());
                    context.commit();
                }
            }
        }}
        />
    );
}

export function ComboBoxItem(props: ListBoxItemProps) {
    return (
        <AriaListBoxItem className={s.listBoxItem} {...props} />
    );
}