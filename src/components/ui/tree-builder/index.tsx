import s from './index.module.scss';
import {
    Button as AriaButton, ButtonProps,
    Collection,
    Disclosure as AriaDisclosure,
    DisclosureGroup as AriaDisclosureGroup, DisclosureGroupProps,
    DisclosurePanel as AriaDisclosurePanel, DisclosurePanelProps, DisclosureProps,
    Heading as AriaHeading, HeadingProps
} from 'react-aria-components';
import {CaretDown, TrashSimple} from '@phosphor-icons/react/dist/ssr';
import {CaretRight} from '@phosphor-icons/react';
import {GraphicsCardPowerSupplyConnectorsTableBuilder} from '@/components/catalogue/views/forms';
import {memo} from 'react';

export function DisclosureGroup({...props} : DisclosureGroupProps) {
    return <AriaDisclosureGroup className={s.group} {...props} />
}

export function Disclosure({...props} : DisclosureProps) {
    return <AriaDisclosure className={s.disclosure} defaultExpanded {...props} />
}

export function Heading({...props} : HeadingProps) {
    return <AriaHeading className={s.heading} {...props} />
}

export function TriggerButton({...props} : ButtonProps) {
    return <AriaButton slot="trigger" className={s.trigger} {...props} />
}

export function TrashButton({...props} : ButtonProps) {
    return <AriaButton className={s.trash} {...props} />
}

export function DisclosurePanel({children, ...props} : DisclosurePanelProps) {
    return (
        <AriaDisclosurePanel {...props}>
            <div className={s.content}>
                {children}
            </div>
        </AriaDisclosurePanel>
    )
}