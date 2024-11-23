'use client';
import {PCIeVersion} from '@/server/models';
import {Content, Footer, FormModule, Row} from '@/app/catalogue/_templates/view';
import NumberField from '@/components/ui/number-field';
import {TextField} from '@/components/ui/text-field';
import {Button} from '@/components/ui/button';
import {useState} from 'react';


interface DetailsProps {
    version: PCIeVersion;
    action: (name: string) => Promise<void>;
}

export function Details({ version, action } : DetailsProps) {

    const [ name, setName ] = useState('')

    return (
        <FormModule title="PCIe version details" subtitle="View and modify this PCIe version's details." action={async() => action(name)}>
            <Content>
                <Row>
                    <NumberField value={version.id} label="ID" isReadOnly />
                    <TextField label="Name" name="name" defaultValue={version.name} onChange={setName} grow isRequired />
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