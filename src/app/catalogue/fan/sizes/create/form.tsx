'use client'
import {Content, Module, PostBody, Row} from '@/components/catalogue/views/item-view';
import {TextField} from '@/components/ui/text-field';
import {useState} from 'react';
import {PostFormProps} from '@/server/models'
import { Fan } from '@/server/models/catalogue';
import { NumberField } from '@/components/ui/number-field';

export function Form({action}: PostFormProps<Fan.SizeDbo, null>) {

    const [sideLength, setSideLength] = useState<number | null>(null)


    return (
        <PostBody name="size" submitAction={async () => await action({
            sideLength,
        })}>
            <Module title="Fan size details" subtitle="Specify details for a new fan size.">
                <Content>
                    <Row>
                        <NumberField label="Side length (mm)" value={sideLength} onChange={setSideLength} minValue={1} step={1} grow isRequired/>
                    </Row>
                </Content>
            </Module>
        </PostBody>
    )
}