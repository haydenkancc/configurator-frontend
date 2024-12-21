'use client'
import {Content, Module, PostBody, Row} from '@/components/catalogue/views/item-view';
import {TextField} from '@/components/ui/text-field';
import {useState} from 'react';
import {PostFormProps} from '@/server/models'
import { PowerSupply } from '@/server/models/catalogue';
import {NumberField} from '@/components/ui/number-field';
import {PowerSupplyConnectorsListBuilder} from '@/components/catalogue/views/forms';
import {useFilter} from '@react-aria/i18n';
import {useListData} from 'react-stately';

export function Form({action, params}: PostFormProps<PowerSupply.ConnectorDbo, PowerSupply.ConnectorParams>) {

    const [name, setName] = useState<string>("")

    const compatibleConnectors= useListData<PowerSupply.ConnectorDtoSimple>({
        initialItems: [],
    });

    return (
        <PostBody name="connector" submitAction={async () => await action({
            name: name,
            compatibleConnectorIDs: compatibleConnectors.items.map(({id}) => id),
        })}>
            <Module title="Connector details" subtitle="View and modify this connector's details.">
                <Content>
                    <Row>
                        <TextField label="Name" value={name} onChange={setName} grow isRequired/>
                    </Row>
                </Content>
            </Module>
            <Module title="Compatible connectors" subtitle="Specify which connectors are compatible with this connector.">
                <Content>
                    <PowerSupplyConnectorsListBuilder compatibleConnectors={compatibleConnectors} connectors={params?.connectors} />
                </Content>
            </Module>
        </PostBody>
    )
}