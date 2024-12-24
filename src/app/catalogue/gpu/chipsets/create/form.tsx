'use client'
import {Content, Module, PostBody, Row} from '@/components/catalogue/views/item-view';
import {TextField} from '@/components/ui/text-field';
import {forwardRef, useState} from 'react';
import {PostFormProps} from '@/server/models'
import { GraphicsCard } from '@/server/models/catalogue';
import s from './a.module.scss';
import {CaretDown} from "@phosphor-icons/react/dist/ssr";
import {PowerSupplyConnectorsListBuilder} from "@/components/catalogue/views/forms";
import {useListData} from "react-stately";
import {Heading, Disclosure, DisclosurePanel, Button} from 'react-aria-components';

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
            <Module title="Power configurations" subtitle="Specify power connector configurations for this graphics card.">
                <Content>
                    <Poop>

                    </Poop>
                </Content>
            </Module>
        </PostBody>
    )
}

export function Poop() {
    const poop = useListData({})
    return (
        <Disclosure className={s.hello} defaultExpanded={false}>
            <Heading>
                <Button slot="trigger" className={s.card}>
                    Configuration 1
                    <CaretDown weight="bold"/>
                </Button>
            </Heading>
            <DisclosurePanel>
                <div className={s.content}>
                    hello
                    <PowerSupplyConnectorsListBuilder compatibleConnectors={poop}/>
                    <Disclosure className={s.hello}>
                        <Heading className={s.card}>
                            <Heading>
                                <Button slot="trigger" className={s.card}>
                                    Configuration 1
                                    <CaretDown weight="bold"/>
                                </Button>
                            </Heading>
                        </Heading>
                        <DisclosurePanel>
                            <PowerSupplyConnectorsListBuilder compatibleConnectors={poop}/>
                        </DisclosurePanel>
                    </Disclosure>
                </div>
            </DisclosurePanel>
        </Disclosure>
    )
}