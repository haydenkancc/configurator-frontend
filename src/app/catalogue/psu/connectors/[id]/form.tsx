'use client';
import {PutFormProps} from '@/server/models'
import { PowerSupply } from '@/server/models/catalogue';
import {Content, Module, PutBody, Row} from '@/components/catalogue/views/item-view';
import {NumberField} from '@/components/ui/number-field';
import {TextField} from '@/components/ui/text-field';
import {useState} from 'react';
import {useListData} from 'react-stately';
import {useFilter} from '@react-aria/i18n';

export function Form({item, action, params}: PutFormProps<PowerSupply.ConnectorDto, PowerSupply.ConnectorDbo, PowerSupply.ConnectorParams>) {

    const [name, setName] = useState<string>(item?.name ?? "")

    const compatibleConnectors= useListData<PowerSupply.ConnectorDtoSimple>({
        initialItems: item?.compatibleConnectors,
    });

    return (
        <PutBody name="connector" submitAction={async () => await action({
            name: name,
            compatibleConnectorIDs: compatibleConnectors.items.map(({id}) => id)
        })}>
            <Module title="Connector details" subtitle="View and modify this connector's details.">
                <Content>
                    <Row>
                        <NumberField value={item?.id} label="ID" isReadOnly/>
                        <TextField label="Name" value={name} onChange={setName} grow isRequired/>
                    </Row>
                </Content>
            </Module>
            <Module title="Compatible connectors" subtitle="Specify which connectors are compatible with this connector.">
                <Content>
                </Content>
            </Module>
        </PutBody>
    )
}