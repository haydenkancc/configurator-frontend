'use client';
import {PutFormProps} from '@/server/models'
import { Pcie } from '@/server/models/catalogue';
import {Content, Module, PutBody, Row} from '@/components/catalogue/views/item-view';
import {NumberField} from '@/components/ui/number-field';
import {TextField} from '@/components/ui/text-field';
import {useState} from 'react';

export function Form({item, action}: PutFormProps<Pcie.SizeDto, Pcie.SizeDbo, null>) {

    const [laneCount, setLaneCount] = useState<number | null>(item?.laneCount ?? null);

    return (
        <PutBody name="size" submitAction={async () => await action({
            laneCount: laneCount,
        })}>
            <Module title="PCIe size details" subtitle="View and modify this PCIe size's details.">
                <Content>
                    <Row>
                        <NumberField value={item?.id} label="ID" isReadOnly/>
                        <NumberField label="Lane count" value={laneCount} onChange={setLaneCount} minValue={1} step={1} grow isRequired/>
                    </Row>
                </Content>
            </Module>
        </PutBody>
    )
}