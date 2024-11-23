'use client';
import {PCIeBracket} from '@/server/models';
import {Content, Footer, FormModule, Row} from '@/app/catalogue/_templates/view';
import NumberField from '@/components/ui/number-field';
import {TextField} from '@/components/ui/text-field';
import {Button} from '@/components/ui/button';
import {useState} from 'react';


interface DetailsProps {
    bracket: PCIeBracket;
    action: (name: string) => Promise<void>;
}

export function Details({ bracket, action } : DetailsProps) {

    const [ name, setName ] = useState('')

    return (
        <FormModule title="PCIe bracket details" subtitle="View and modify this PCIe bracket's details." action={async() => action(name)}>
            <Content>
                <Row>
                    <NumberField value={bracket.id} label="ID" isReadOnly />
                    <TextField label="Name" name="name" defaultValue={bracket.name} onChange={setName} grow isRequired />
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