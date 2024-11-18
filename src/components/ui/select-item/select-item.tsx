'use client';
import s from './select-item.module.scss';
import {ListBoxItem as AriaListBoxItem, ListBoxItemProps} from 'react-aria-components';

export default function SelectItem(props: ListBoxItemProps) {
    return (
        <AriaListBoxItem className={s.listBoxItem} {...props} />
    );
}
