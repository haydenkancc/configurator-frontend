'use client'
import {MemorySize} from '@/server/models';
import {Content, Footer, FormModule, Row} from '@/app/catalogue/_templates/view';
import NumberField from '@/components/ui/number-field';
import {TextField} from '@/components/ui/text-field';
import {Button} from '@/components/ui/button';
import {useState} from 'react';


interface DetailsProps {
    memorySize: MemorySize;
    action: (size: number) => Promise<void>;
}

export function Details({ memorySize, action } : DetailsProps) {

    const [ size, setSize ] = useState(memorySize.size)

    return (
        <FormModule title="Memory size details" subtitle="View and modify this Memory size's details." action={async() => await action(size)}>
            <Content>
                <Row>
                    <NumberField label="Size (GB)" value={size} onChange={setSize} grow isRequired minValue={1} />
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