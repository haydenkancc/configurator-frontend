import s from './index.module.scss';
import {Label as AriaLabel, LabelProps} from 'react-aria-components';
import {VisuallyHidden} from 'react-aria';

interface MyLabelProps extends LabelProps {
    isRequired?: boolean;
}

export default function Label({ children, isRequired, ...props} : MyLabelProps) {
    return (
            <AriaLabel className={`${s.label} ${children ? '' : s.hidden}`} {...props}>
                {children}{isRequired && <span className={s.required}>&nbsp;*</span>}
            </AriaLabel>
    )
}