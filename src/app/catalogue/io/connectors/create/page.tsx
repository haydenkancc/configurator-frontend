import {Form} from './form';
import {IOConnector, IOConnectorBase, IOConnectorDbo, IOConnectorParams} from '@/server/models';
import {configuratorApiClient} from '@/server/catalogue';
import {revalidateTag} from 'next/cache';
import {redirect} from 'next/navigation';

export default async function Page() {

    async function getConnectorParams() {
        'use server';
        const response = await configuratorApiClient.Get<IOConnectorParams>('api/IO/IOConnectors/params', ['IOConnectors']);
        return response.data;
    }

    async function submitAction(name: string, compatibleConnectors: IOConnectorBase[]) {
        'use server'
        const connector: IOConnectorDbo = {
            name: name,
            compatibleConnectorIDs: compatibleConnectors.map(({id}) => id),
        };
        const response = await configuratorApiClient.Post<IOConnector>(`api/IO/IOConnectors`, connector);
        if(!response.error) {
            revalidateTag('IOConnectors');
            redirect(`/catalogue/io/connectors/${response.data?.id}`)
        }
    }

    const connectorParams = await getConnectorParams() ?? undefined;

    return (
        <Form action={submitAction} connectorParams={connectorParams} />
    )
}