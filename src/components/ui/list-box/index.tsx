import s from './index.module.scss';

import {ListBox as AriaListBox, ListBoxItem as AriaListBoxItem, ListBoxItemProps as AriaListBoxItemProps, ListBoxProps as AriaListBoxProps} from 'react-aria-components';

export interface ListBoxProps<T> extends AriaListBoxProps<T> {
    grow?: boolean;
}

export function ListBox<T extends object>({ className, grow = false, children, ...props }: ListBoxProps<T>) {
    return (
        <AriaListBox {...props} className={`${s.listBox} ${className} ${grow ? s.grow : ''}`}>
            {children}
        </AriaListBox>
    );
}

export function ListBoxItem({className, ...props} : AriaListBoxItemProps) {
    return (
        <AriaListBoxItem {...props} className={`${s.listBoxItem} ${className}`}/>
    );
}
