'use client';
import {PutFormProps} from '@/server/models'
import {FanSize, FanSizeDbo} from '@/server/models/components';
import {Content, Module, PutBody, Row} from '@/app/catalogue/_templates/view';
import {NumberField} from '@/components/ui/number-field';
import {TextField} from '@/components/ui/text-field';
import {useState} from 'react';

export function Form({ item, action } : PutFormProps<FanSize, FanSizeDbo>) {

    const [ size, setSize ] = useState(item?.size)

    return (
        <PutBody name="size" submitAction={async () => await action({ size })}>
            <Module title="Fan size details" subtitle="View and modify this fan size's details.">
                <Content>
                    <Row>
                        <NumberField value={item?.id} label="ID" isReadOnly />
                        <NumberField label="Size (mm)" value={size} onChange={setSize} grow isRequired />
                    </Row>
                </Content>
            </Module>
        </PutBody>
    )
}