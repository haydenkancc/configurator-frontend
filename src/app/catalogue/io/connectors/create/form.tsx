'use client'
import {Content, Module, PostBody, Row} from '@/components/catalogue/views/item-view';
import {TextField} from '@/components/ui/text-field';
import {useState} from 'react';
import {PostFormProps} from '@/server/models'
import { IO } from '@/server/models/catalogue';
import {NumberField} from '@/components/ui/number-field';
import {
    IOConnectorsListBuilder,
    transformIOConnectorsDtoToMap,
    transformIOConnectorsMapToDbo
} from '@/components/catalogue/views/forms';
import {useFilter} from '@react-aria/i18n';
import {useListData} from 'react-stately';
import {useImmer} from 'use-immer';
import {enableMapSet} from 'immer';

enableMapSet();

export function Form({action, params}: PostFormProps<IO.ConnectorDbo, IO.ConnectorParams>) {

    const [name, setName] = useState<string>("")

    const [compatibleConnectors, setCompatibleConnectors] = useImmer(transformIOConnectorsDtoToMap(null));

    return (
        <PostBody name="connector" submitAction={async () => await action({
            name: name,
            compatibleConnectorIDs: transformIOConnectorsMapToDbo(compatibleConnectors)
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
                    <IOConnectorsListBuilder compatibleConnectors={compatibleConnectors} setCompatibleConnectors={setCompatibleConnectors} connectors={params?.connectors} />
                </Content>
            </Module>
        </PostBody>
    )
}