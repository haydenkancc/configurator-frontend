import s from './index.module.scss';

import {GridList as AriaGridList, GridListItem as AriaGridListItem, GridListItemProps as AriaGridListItemProps, GridListProps as AriaGridListProps} from 'react-aria-components';

export interface GridListProps<T> extends AriaGridListProps<T> {
    grow?: boolean;
}

export function GridList<T extends object>({ className, grow = false, children, ...props }: GridListProps<T>) {
    return (
        <AriaGridList {...props} className={`${s.listBox} ${className} ${grow ? s.grow : ''}`}>
            {children}
        </AriaGridList>
    );
}

export function GridListItem({className, ...props} : AriaGridListItemProps) {
    return (
        <AriaGridListItem {...props} className={`${s.listBoxItem} ${className}`}/>
    );
}
