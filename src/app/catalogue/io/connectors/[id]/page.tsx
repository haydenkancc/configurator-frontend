import {
    BackLink,
    Controls,
    Body,
} from '@/app/catalogue/_templates/view';
import React from 'react';
import {Details, Connectors} from './forms';
import {IOConnector, IOConnectorBase, IOConnectorDbo, IOConnectorParams} from '@/server/models';
import {configuratorApiClient} from '@/server/catalogue';
import {revalidatePath, revalidateTag} from 'next/cache';
import {redirect} from 'next/navigation';


export default async function Page({ params } : { params: Promise<{ id: string }> }) {

    const id = parseInt((await params).id);

    async function getConnectorParams() {
        'use server';
        const response = await configuratorApiClient.Get<IOConnectorParams>('api/IO/IOConnectors/params', ['IOConnectors']);
        return response.data;
    }

    async function getConnector(id: number) {
        const response = await configuratorApiClient.Get<IOConnector>(`api/IO/IOConnectors/id/${id}`, ['IOConnectors'])
        return response.data;
    }

    async function submitConnectorsAction(compatibleConnectors: IOConnectorBase[]) {
        'use server';
        const compatibleConnectorIDs: IOConnectorDbo["compatibleConnectorIDs"] = compatibleConnectors.map(({id}) => id);
        await configuratorApiClient.Put<Partial<IOConnectorDbo>>(`api/IO/IOConnectors/id/${id}`,
            {
                compatibleConnectorIDs,
            })
        revalidateTag('IOConnectors')
        redirect(`/catalogue/io/connectors/${id}`)
    }

    async function submitDetailsAction(name: string) {
        'use server'
        if (name)
        {
            const response = await configuratorApiClient.Put<Partial<IOConnectorDbo>>(`api/IO/IOConnectors/id/${id}`,
                {
                    name,
                })

            if(!response.error) {
                revalidateTag('IOConnectors');
                redirect(`/catalogue/io/connectors/${id}`)
            }
        }
    }


    const connectorParams = await getConnectorParams() ?? undefined;

    const connector = (await getConnector(id))!

    return (
        <Body>
            <Controls>
                <BackLink />
            </Controls>
            <Details ioConnector={connector} action={submitDetailsAction} />
            <Connectors ioConnector={connector} connectorParams={connectorParams} action={submitConnectorsAction} />
        </Body>
    )
}