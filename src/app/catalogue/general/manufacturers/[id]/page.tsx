import {BackButton, Content, Controls, Body, FormModule, Footer, Row, BackLink} from '@/app/catalogue/_templates/view';
import {configuratorApiClient} from '@/server/catalogue';
import {Manufacturer, ManufacturerDbo} from '@/server/models';
import {revalidateTag} from 'next/cache';
import {redirect} from 'next/navigation';
import {Details} from './forms';



export default async function Page({ params } : { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);

    async function getFormFactor(id: number) {
        const response = await configuratorApiClient.Get<Manufacturer>(`api/Manufacturers/id/${id}`, ['Manufacturers'])
        return response.data;
    }

    async function submitDetailsAction(name: string) {
        'use server'
        if (name)
        {
            const response = await configuratorApiClient.Put<ManufacturerDbo>(`api/Manufacturers/id/${id}`,
                {
                    name,
                })
            if(!response.error) {
                revalidateTag('Manufacturers');
                redirect(`/catalogue/general/manufacturers/${id}`)
            }
        }
    }

    const manufacturer = (await getFormFactor(id))!;

    return (
        <Body>
            <Controls>
                <BackLink />
            </Controls>
            <Details manufacturer={manufacturer} action={submitDetailsAction}/>
        </Body>
    )
}