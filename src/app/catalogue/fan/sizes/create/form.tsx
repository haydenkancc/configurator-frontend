'use client'
import {Content, Module, PostBody, Row} from '@/app/catalogue/_templates/view';
import {TextField} from '@/components/ui/text-field';
import {useState} from 'react';
import {PostFormProps} from '@/server/models'
import {FanSizeDbo} from '@/server/models/components';
import {NumberField} from '@/components/ui/number-field';

export function Form({ action } : PostFormProps<FanSizeDbo>) {

    const [ size, setSize ] = useState<number | undefined>()


    return (
        <PostBody name="size" submitAction={async () => await action({size})}>
            <Module title="Fan size details" subtitle="Specify details for a new fan size.">
                <Content>
                    <Row>
                        <NumberField label="Size (mm)" value={size} onChange={setSize} grow isRequired />
                    </Row>
                </Content>
            </Module>
        </PostBody>
    )
}