'use client'
import {BackLink, Content, Controls, FormBody, Module, Row} from '@/app/catalogue/_templates/view';
import {Button} from '@/components/ui/button';
import {TextField} from '@/components/ui/text-field';
import {useState} from 'react';
import NumberField from '@/components/ui/number-field';

interface FormProps {
    action: (size: number) => Promise<void>
}

export function Form({ action } : FormProps) {

    const [ size, setSize ] = useState<number | undefined>()

    return (
        <FormBody action={async () => await action(size!)}>
            <Controls>
                <BackLink />
                <Button variant="primary" type="submit">
                    Create size
                </Button>
            </Controls>
            <Module title="Memory size details" subtitle="Specify details for a new Memory size.">
                <Content>
                    <Row>
                        <NumberField label="Size (GB)" name="size" value={size} onChange={setSize} grow isRequired minValue={1} />
                    </Row>
                </Content>
            </Module>
        </FormBody>
    )
}