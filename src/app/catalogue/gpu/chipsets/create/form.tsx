'use client'
import {Content, Module, PostBody, Row} from '@/components/catalogue/views/item-view';
import {TextField} from '@/components/ui/text-field';
import {forwardRef, useCallback, useState} from 'react';
import {PostFormProps} from '@/server/models'
import { GraphicsCard } from '@/server/models/catalogue';
import s from '../../../../../components/catalogue/views/forms/a.module.scss';
import {CaretDown, Plus} from "@phosphor-icons/react/dist/ssr";
import {
    GraphicsCardPowerConnectorConfigurationsTreeBuilder,
} from "@/components/catalogue/views/forms";
import {useListData} from "react-stately";
import {Heading, Disclosure, DisclosurePanel, Button as AriaButton} from 'react-aria-components';
import {produce} from 'immer';
import {useImmer} from 'use-immer';
import {Button} from '@/components/ui/button';

export function Form({action}: PostFormProps<GraphicsCard.ChipsetDbo, null>) {

    const [name, setName] = useState<string>("")


    return (
        <PostBody name="chipset" submitAction={async () => await action({
            name: name,
        })}>
            <Module title="Chipset details" subtitle="Specify details for a new chipset.">
                <Content>
                    <Row>
                        <TextField label="Name" value={name} onChange={setName} grow isRequired/>
                    </Row>
                </Content>
            </Module>
        </PostBody>
    )
}
