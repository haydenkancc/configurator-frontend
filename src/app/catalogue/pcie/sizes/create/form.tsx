'use client'
import {BackLink, Content, Controls, FormBody, Module, Row} from '@/app/catalogue/_templates/view';
import {Button} from '@/components/ui/button';
import {TextField} from '@/components/ui/text-field';
import {useState} from 'react';
import NumberField from '@/components/ui/number-field';

interface FormParams {
    action: (laneCount: number) => Promise<void>
}

export function Form({ action } : FormParams) {

    const [ laneCount, setLaneCount ] = useState<number | undefined>()

    return (
        <FormBody action={async () => await action(laneCount!)}>
            <Controls>
                <BackLink />
                <Button variant="primary" type="submit">
                    Create size
                </Button>
            </Controls>
            <Module title="PCIe size details" subtitle="Specify details for a new PCIe size.">
                <Content>
                    <Row>
                        <NumberField label="Lane count" name="laneCount" value={laneCount} onChange={setLaneCount} grow isRequired minValue={1} />
                    </Row>
                </Content>
            </Module>
        </FormBody>
    )
}