import {BackButton, Content, Controls, Body, FormModule, Footer, Row, BackLink} from '@/app/catalogue/_templates/view';
import {configuratorApiClient} from '@/server/catalogue';
import {PCIeBracket, PCIeBracketDbo} from '@/server/models';
import {revalidateTag} from 'next/cache';
import {redirect} from 'next/navigation';
import {Details} from './forms';



export default async function Page({ params } : { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);

    async function getBracket(id: number) {
        const response = await configuratorApiClient.Get<PCIeBracket>(`api/PCIe/PCIeBrackets/id/${id}`, ['PCIeBrackets'])
        return response.data;
    }

    async function submitDetailsAction(name: string) {
        'use server'
        if (name)
        {
            const response = await configuratorApiClient.Put<PCIeBracketDbo>(`api/PCIe/PCIeBrackets/id/${id}`,
                {
                    name,
                })
            if(!response.error) {
                revalidateTag('PCIeBrackets');
                redirect(`/catalogue/pcie/brackets/${id}`)
            }
        }
    }

    const bracket = (await getBracket(id))!;

    return (
        <Body>
            <Controls>
                <BackLink />
            </Controls>
            <Details bracket={bracket} action={submitDetailsAction}/>
        </Body>
    )
}