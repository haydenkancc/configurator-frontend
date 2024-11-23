import {BackButton, Content, Controls, Body, FormModule, Footer, Row, BackLink} from '@/app/catalogue/_templates/view';
import {configuratorApiClient} from '@/server/catalogue';
import {MemoryFormFactor, MemoryFormFactorDbo} from '@/server/models';
import {revalidateTag} from 'next/cache';
import {redirect} from 'next/navigation';
import {Details} from './forms';



export default async function Page({ params } : { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);

    async function getFormFactor(id: number) {
        const response = await configuratorApiClient.Get<MemoryFormFactor>(`api/Memory/MemoryFormFactors/id/${id}`, ['MemoryFormFactors'])
        return response.data;
    }

    async function submitDetailsAction(name: string) {
        'use server'
        if (name)
        {
            const response = await configuratorApiClient.Put<MemoryFormFactorDbo>(`api/Memory/MemoryFormFactors/id/${id}`,
                {
                    name,
                })
            if(!response.error) {
                revalidateTag('MemoryFormFactors');
                redirect(`/catalogue/ram/form-factors/${id}`)
            }
        }
    }

    const formFactor = (await getFormFactor(id))!;

    return (
        <Body>
            <Controls>
                <BackLink />
            </Controls>
            <Details formFactor={formFactor} action={submitDetailsAction}/>
        </Body>
    )
}