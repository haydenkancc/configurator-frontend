import s from './index.module.scss';

import {Checkbox as AriaCheckbox, CheckboxProps} from 'react-aria-components';
import {Check} from '@phosphor-icons/react';

export function Checkbox({children, isRequired, ...props} : CheckboxProps) {
    return (
        <AriaCheckbox className={s.checkbox} {...props}>

            {({isSelected}) => <>
                <div className={s.checkboxBox}>
                    {isSelected && <Check weight="bold" className={s.checkboxIcon}/>}
                </div>
                {children} {isRequired && <span className={s.required}>*</span>}
            </>}
        </AriaCheckbox>
    )
}
