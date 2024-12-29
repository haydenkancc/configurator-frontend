import s from './index.module.scss';

import {Checkbox as AriaCheckbox, CheckboxProps as AriaCheckboxProps} from 'react-aria-components';
import {Check} from '@phosphor-icons/react';

export interface CheckboxProps extends Omit<AriaCheckboxProps, "isSelected"> {
    isSelected?: boolean | null;
}
export function Checkbox({children, isRequired, isSelected, ...props} : CheckboxProps) {
    return (
        <AriaCheckbox className={s.checkbox} isSelected={isSelected ?? undefined} {...props}>
            {({isSelected}) => <>
                <div className={s.checkboxBox}>
                    {isSelected && <Check weight="bold" className={s.checkboxIcon}/>}
                </div>
                {children as React.ReactNode} {isRequired && <span className={s.required}>*</span>}
            </>}
        </AriaCheckbox>
    )
}
