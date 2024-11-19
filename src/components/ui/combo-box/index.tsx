'use client'
import s from './index.module.scss';
import {
    Button,
    ComboBox as AriaComboBox, ComboBoxProps,
    FieldError,
    Text,
    Input,
    ListBox,
    Popover,
    ValidationResult
} from 'react-aria-components';
import { CaretDown } from '@phosphor-icons/react/dist/ssr';
import Label from "@/components/ui/label";

interface MyComboBoxProps<T extends object>
    extends Omit<ComboBoxProps<T>, 'children'> {
    label?: string;
    description?: string | null;
    errorMessage?: (validation: ValidationResult) => string;
    children: React.ReactNode | ((item: T) => React.ReactNode);
    grow?: boolean;
}

export default function ComboBox<T extends object>({ label, description, errorMessage, children, isRequired, className, grow = false, ...props }: MyComboBoxProps<T>) {
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
                <ListBox className={s.listBox}>
                    {children}
                </ListBox>
            </Popover>
        </AriaComboBox>
    )
}