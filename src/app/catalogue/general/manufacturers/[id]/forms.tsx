'use client';
import {Manufacturer} from '@/server/models';
import {Content, Footer, FormModule, Row} from '@/app/catalogue/_templates/view';
import NumberField from '@/components/ui/number-field';
import {TextField} from '@/components/ui/text-field';
import {Button} from '@/components/ui/button';
import {useState} from 'react';


interface DetailsProps {
    manufacturer: Manufacturer;
    action: (name: string) => Promise<void>;
}

export function Details({ manufacturer, action } : DetailsProps) {

    const [ name, setName ] = useState('')

    return (
        <FormModule title="Manufacturer details" subtitle="View and modify this manufacturer's details." action={async() => action(name)}>
            <Content>
                <Row>
                    <NumberField value={manufacturer.id} label="ID" isReadOnly />
                    <TextField label="Name" name="name" defaultValue={manufacturer.name} onChange={setName} grow isRequired />
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