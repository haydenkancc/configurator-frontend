'use client';
import {PutFormProps} from '@/server/models'
import { Fan } from '@/server/models/catalogue';
import {Content, Module, PutBody, Row} from '@/components/catalogue/views/item-view';
import {NumberField} from '@/components/ui/number-field';
import {TextField} from '@/components/ui/text-field';
import {useState} from 'react';

export function Form({item, action}: PutFormProps<Fan.SizeDto, Fan.SizeDbo, null>) {

    const [sideLength, setSideLength] = useState<number | null>(item?.sideLength ?? null);

    return (
        <PutBody name="size" submitAction={async () => await action({
            sideLength,
        })}>
            <Module title="Fan size details" subtitle="View and modify this fan size's details.">
                <Content>
                    <Row>
                        <NumberField value={item?.id} label="ID" isReadOnly/>
                        <NumberField label="Side length (mm)" value={sideLength} onChange={setSideLength} minValue={1} step={1} grow isRequired/>
                    </Row>
                </Content>
            </Module>
        </PutBody>
    )
}