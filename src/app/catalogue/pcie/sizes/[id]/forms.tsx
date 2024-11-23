'use client'
import {PCIeSize} from '@/server/models';
import {Content, Footer, FormModule, Row} from '@/app/catalogue/_templates/view';
import NumberField from '@/components/ui/number-field';
import {TextField} from '@/components/ui/text-field';
import {Button} from '@/components/ui/button';
import {useState} from 'react';


interface DetailsProps {
    size: PCIeSize;
    action: (laneCount: number) => Promise<void>;
}

export function Details({ size, action } : DetailsProps) {

    const [ laneCount, setLaneCount ] = useState(size.laneCount)

    return (
        <FormModule title="PCIe size details" subtitle="View and modify this PCIe size's details." action={async() => await action(laneCount)}>
            <Content>
                <Row>
                    <NumberField value={size.id} label="ID" isReadOnly />
                    <NumberField label="Lane count" name="laneCount" value={laneCount} onChange={setLaneCount} grow isRequired minValue={1} />
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