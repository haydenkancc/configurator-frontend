import {
    BackLink,
    Controls,
    Body,
} from '@/app/catalogue/_templates/view';
import React from 'react';
import {Details, Keys} from '@/app/catalogue/m2/keys/[id]/forms';
import {M2Key, M2KeyBase, M2KeyDbo, M2KeyParams} from '@/server/models';
import {configuratorApiClient} from '@/server/catalogue';
import {revalidatePath, revalidateTag} from 'next/cache';
import {redirect} from 'next/navigation';


export default async function Page({ params } : { params: Promise<{ id: string }> }) {

    const id = parseInt((await params).id);

    async function getKeyParams() {
        'use server';
        const response = await configuratorApiClient.Get<M2KeyParams>('api/M2/M2Keys/params', ['M2Keys']);
        return response.data;
    }

    async function getKey(id: number) {
        const response = await configuratorApiClient.Get<M2Key>(`api/M2/M2Keys/id/${id}`, ['M2Keys'])
        return response.data;
    }

    async function submitKeysAction(compatibleKeys: M2KeyBase[]) {
        'use server';
        const compatibleKeyIDs: M2KeyDbo["compatibleKeyIDs"] = compatibleKeys.map(({id}) => id);
        await configuratorApiClient.Put<Partial<M2KeyDbo>>(`api/M2/M2Keys/id/${id}`,
            {
                compatibleKeyIDs,
            })
        revalidateTag('M2Keys')
        redirect(`/catalogue/m2/keys/${id}`)
    }

    async function submitDetailsAction(name: string) {
        'use server'
        if (name)
        {
            const response = await configuratorApiClient.Put<Partial<M2KeyDbo>>(`api/M2/M2Keys/id/${id}`,
                {
                    name,
                })

            if(!response.error) {
                revalidateTag('M2Keys');
                redirect(`/catalogue/m2/keys/${id}`)
            }
        }
    }


    const keyParams = await getKeyParams() ?? undefined;

    const key = (await getKey(id))!

    return (
        <Body>
            <Controls>
                <BackLink />
            </Controls>
            <Details m2key={key} action={submitDetailsAction} />
            <Keys m2key={key} keyParams={keyParams} action={submitKeysAction} />
        </Body>
    )
}