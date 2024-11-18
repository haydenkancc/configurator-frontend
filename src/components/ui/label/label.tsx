import s from './label.module.scss';
import {Label as AriaLabel, LabelProps} from 'react-aria-components';

interface MyLabelProps extends LabelProps {
    isRequired?: boolean;
}

export default function Label({ children, isRequired, ...props} : MyLabelProps) {
    return (
        <AriaLabel className={s.label} {...props}>
            {children}{isRequired && <span className={s.required}>&nbsp;*</span>}
        </AriaLabel>
    )
}