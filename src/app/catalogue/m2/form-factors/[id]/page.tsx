import {BackButton, Content, Controls, Body, FormModule, Footer, Row, BackLink} from '@/app/catalogue/_templates/view';
import {configuratorApiClient} from '@/server/catalogue';
import {M2FormFactor, M2FormFactorDbo} from '@/server/models';
import {revalidateTag} from 'next/cache';
import {redirect} from 'next/navigation';
import {Details} from './forms';



export default async function Page({ params } : { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);

    async function getFormFactor(id: number) {
        const response = await configuratorApiClient.Get<M2FormFactor>(`api/M2/M2FormFactors/id/${id}`, ['M2FormFactors'])
        return response.data;
    }

    async function submitDetailsAction(name: string) {
        'use server'
        if (name)
        {
            const response = await configuratorApiClient.Put<M2FormFactorDbo>(`api/M2/M2FormFactors/id/${id}`,
                {
                    name,
                })
            if(!response.error) {
                revalidateTag('M2FormFactors');
                redirect(`/catalogue/m2/form-factors/${id}`)
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