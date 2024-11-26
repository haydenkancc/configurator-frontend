import {BackButton, Content, Controls, Body, FormModule, Footer, Row, BackLink} from '@/app/catalogue/_templates/view';
import {configuratorApiClient} from '@/server/catalogue';
import {MemoryType, MemoryTypeDbo} from '@/server/models';
import {revalidateTag} from 'next/cache';
import {redirect} from 'next/navigation';
import {Details} from './forms';



export default async function Page({ params } : { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);

    async function getType(id: number) {
        const response = await configuratorApiClient.Get<MemoryType>(`api/Memory/MemoryTypes/id/${id}`, ['MemoryTypes'])
        return response.data;
    }

    async function submitDetailsAction(name: string) {
        'use server'
        if (name)
        {
            const response = await configuratorApiClient.Put<MemoryTypeDbo>(`api/Memory/MemoryTypes/id/${id}`,
                {
                    name,
                })
            if(!response.error) {
                revalidateTag('MemoryTypes');
                redirect(`/catalogue/ram/types/${id}`)
            }
        }
    }

    const type = (await getType(id))!;

    return (
        <Body>
            <Controls>
                <BackLink />
            </Controls>
            <Details type={type} action={submitDetailsAction}/>
        </Body>
    )
}