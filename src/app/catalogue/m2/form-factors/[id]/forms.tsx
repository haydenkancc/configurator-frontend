'use client';
import {M2FormFactor} from '@/server/models';
import {Content, Footer, FormModule, Row} from '@/app/catalogue/_templates/view';
import NumberField from '@/components/ui/number-field';
import {TextField} from '@/components/ui/text-field';
import {Button} from '@/components/ui/button';
import {useState} from 'react';


interface DetailsProps {
    formFactor: M2FormFactor;
    action: (name: string) => Promise<void>;
}

export function Details({ formFactor, action } : DetailsProps) {

    const [ name, setName ] = useState('')

    return (
        <FormModule title="M.2 form factor details" subtitle="View and modify this M.2 form factor's details." action={async() => action(name)}>
            <Content>
                <Row>
                    <NumberField value={formFactor.id} label="ID" isReadOnly />
                    <TextField label="Name" name="name" defaultValue={formFactor.name} onChange={setName} grow isRequired />
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