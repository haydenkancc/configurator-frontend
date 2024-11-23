import {
    BackLink,
    Controls,
    Body,
} from '@/app/catalogue/_templates/view';
import React from 'react';
import {Details, FormFactors } from '@/app/catalogue/m2/slots/[id]/forms';
import {M2SlotParams, M2Slot, M2SlotDbo, M2FormFactor} from '@/server/models';
import {configuratorApiClient} from '@/server/catalogue';
import {revalidatePath, revalidateTag} from 'next/cache';
import {redirect} from 'next/navigation';
import {Key} from 'react-aria-components';


export default async function Page({ params } : { params: Promise<{ id: string }> }) {

    const id = parseInt((await params).id);

    async function getSlotParams() {
        'use server';
        const response = await configuratorApiClient.Get<M2SlotParams>('api/M2/M2Slots/params', ['M2Slots']);
        return response.data;
    }

    async function getSlot(id: number) {
        const response = await configuratorApiClient.Get<M2Slot>(`api/M2/M2Slots/id/${id}`, ['M2Slots'])
        return response.data;
    }

    async function submitFormFactorsAction(formFactors: M2FormFactor[]) {
        'use server';
        const formFactorIDs: M2SlotDbo["formFactorIDs"] = formFactors.map(({id}) => id);
        await configuratorApiClient.Put<Partial<M2SlotDbo>>(`api/M2/M2Slots/id/${id}`,
            {
                formFactorIDs,
            })
        revalidateTag('M2Slots')
        redirect(`/catalogue/m2/slots/${id}`)
    }

    async function submitDetailsAction(keyID?: Key, versionID?: Key, laneSizeID?: Key) {
        'use server'
        if(keyID || laneSizeID || versionID)
        {
            const slot: Partial<M2SlotDbo> = {
                keyID: keyID as number,
                laneSizeID: laneSizeID as number,
                versionID: versionID as number,
            };

            console.log(slot);

            const response = await configuratorApiClient.Put<M2Slot>(`api/M2/M2Slots/id/${id}`, slot);
            console.log(response);
            if(!response.error) {
                revalidateTag('M2Slots');
                redirect(`/catalogue/m2/slots/${id}`)
            }
        }
    }


    const slotParams = await getSlotParams() ?? undefined;

    const slot = (await getSlot(id))!

    return (
        <Body>
            <Controls>
                <BackLink />
            </Controls>
            <Details slotParams={slotParams} m2slot={slot} action={submitDetailsAction} />
            <FormFactors m2slot={slot} slotParams={slotParams} action={submitFormFactorsAction} />
        </Body>
    )
}