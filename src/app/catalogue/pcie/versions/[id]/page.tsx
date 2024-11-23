import {BackButton, Content, Controls, Body, FormModule, Footer, Row, BackLink} from '@/app/catalogue/_templates/view';
import {configuratorApiClient} from '@/server/catalogue';
import {PCIeVersion, PCIeVersionDbo} from '@/server/models';
import {revalidateTag} from 'next/cache';
import {redirect} from 'next/navigation';
import {Details} from './forms';



export default async function Page({ params } : { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);

    async function getVersion(id: number) {
        const response = await configuratorApiClient.Get<PCIeVersion>(`api/PCIe/PCIeVersions/id/${id}`, ['PCIeVersions'])
        return response.data;
    }

    async function submitDetailsAction(name: string) {
        'use server'
        if (name)
        {
            const response = await configuratorApiClient.Put<PCIeVersionDbo>(`api/PCIe/PCIeVersions/id/${id}`,
                {
                    name,
                })
            console.log(response);
            if(!response.error) {
                revalidateTag('PCIeVersions');
                redirect(`/catalogue/pcie/versions/${id}`)
            }
        }
    }

    const version = (await getVersion(id))!;

    return (
        <Body>
            <Controls>
                <BackLink />
            </Controls>
            <Details version={version} action={submitDetailsAction}/>
        </Body>
    )
}