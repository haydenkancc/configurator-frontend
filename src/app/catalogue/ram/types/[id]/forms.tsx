'use client';
import {MemoryType} from '@/server/models';
import {Content, Footer, FormModule, Row} from '@/app/catalogue/_templates/view';
import NumberField from '@/components/ui/number-field';
import {TextField} from '@/components/ui/text-field';
import {Button} from '@/components/ui/button';
import {useState} from 'react';


interface DetailsProps {
    type: MemoryType;
    action: (name: string) => Promise<void>;
}

export function Details({ type, action } : DetailsProps) {

    const [ name, setName ] = useState('')

    return (
        <FormModule title="Memory type details" subtitle="View and modify this memory type's details." action={async() => action(name)}>
            <Content>
                <Row>
                    <NumberField value={type.id} label="ID" isReadOnly />
                    <TextField label="Name" name="name" defaultValue={type.name} onChange={setName} grow isRequired />
                </Row>
            </Content>
            <Footer>
                <Button type="reset" variant="neutral">
                    Cancel
                </Button>
                <Button type="submit" variant="primary">
                    Save changes
                </Button>
            </Footer>
        </FormModule>
    )
}