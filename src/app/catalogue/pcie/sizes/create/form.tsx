'use client'
import {Content, Module, PostBody, Row} from '@/components/catalogue/views/item-view';
import {TextField} from '@/components/ui/text-field';
import {useState} from 'react';
import {PostFormProps} from '@/server/models'
import { Pcie } from '@/server/models/catalogue';
import { NumberField } from '@/components/ui/number-field';

export function Form({action}: PostFormProps<Pcie.SizeDbo, null>) {

    const [laneCount, setLaneCount] = useState<number | null>(null)


    return (
        <PostBody name="size" submitAction={async () => await action({
            laneCount: laneCount,
        })}>
            <Module title="PCIe size details" subtitle="Specify details for a new PCIe size.">
                <Content>
                    <Row>
                        <NumberField label="Lane count" value={laneCount} onChange={setLaneCount} minValue={1} step={1} grow isRequired/>
                    </Row>
                </Content>
            </Module>
        </PostBody>
    )
}