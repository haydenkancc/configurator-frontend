'use client'
import {BackLink, Content, Controls, FormBody, Module, Row} from '@/app/catalogue/_templates/view';
import {Button} from '@/components/ui/button';
import {TextField} from '@/components/ui/text-field';
import {useState} from 'react';

interface FormParams {
    action: (name: string) => Promise<void>
}

export function Form({ action } : FormParams) {

    const [ name, setName ] = useState('')

    return (
        <FormBody action={async () => await action(name)}>
            <Controls>
                <BackLink />
                <Button variant="primary" type="submit">
                    Create form factor
                </Button>
            </Controls>
            <Module title="M.2 form factor details" subtitle="Specify details for a new M.2 form factor.">
                <Content>
                    <Row>
                        <TextField label="Name" name="Name" value={name} onChange={setName} grow isRequired />
                    </Row>
                </Content>
            </Module>
        </FormBody>
    )
}