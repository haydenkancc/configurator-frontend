import s from './index.module.scss';
import {FieldError as AriaFieldError, FieldErrorProps} from 'react-aria-components';

export function FieldError({...props} : FieldErrorProps) {
    return (
        <AriaFieldError className={s.fieldError} {...props} />
    )
}