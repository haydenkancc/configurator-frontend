import {BackLink, Content, Controls, Body, FormModule, Footer, Row} from '@/app/catalogue/_templates/view';
import {Button} from '@/components/ui/button';
import NumberField from '@/components/ui/number-field';
import {configuratorApiClient} from '@/server/catalogue';
import {PCIeSize, PCIeSizeDbo} from '@/server/models';
import {revalidateTag} from 'next/cache';
import {redirect} from 'next/navigation';
import { Details } from './forms';


export default async function Page({ params } : { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);

    async function getSize(id: number) {
        const response = await configuratorApiClient.Get<PCIeSize>(`api/PCIe/PCIeSizes/id/${id}`, ['PCIeSizes'])
        return response.data;
    }

    async function submitDetailsAction(laneCount: number) {
        'use server'
        if (laneCount && laneCount > 0)
        {
            const response = await configuratorApiClient.Put<PCIeSizeDbo>(`api/PCIe/PCIeSizes/id/${id}`,
                {
                    laneCount,
                })
            if(!response.error) {
                revalidateTag('PCIeSizes');
                redirect(`/catalogue/pcie/sizes/${id}`)
            }
        }
    }

    const size = (await getSize(id))!;

    return (
        <Body>
            <Controls>
                <BackLink />
            </Controls>
            <Details size={size} action={submitDetailsAction} />
        </Body>
    )
}