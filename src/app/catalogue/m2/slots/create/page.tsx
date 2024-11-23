import {Form} from './form';
import {M2FormFactor, M2Slot, M2SlotDbo, M2SlotParams} from '@/server/models';
import {configuratorApiClient} from '@/server/catalogue';
import {revalidateTag} from 'next/cache';
import {redirect} from 'next/navigation';
import {Key} from 'react-aria-components';

export default async function Page() {

    async function getSlotParams() {
        'use server';
        const response = await configuratorApiClient.Get<M2SlotParams>('api/M2/M2Slots/params', ['M2Slots']);
        return response.data;
    }

    async function submitAction(formFactors: M2FormFactor[], keyID?: Key, laneSizeID?: Key, versionID?: Key) {
        'use server'
        if(keyID && formFactors.length > 0 && laneSizeID && versionID)
        {
            const slot: M2SlotDbo = {
                keyID: keyID as number,
                formFactorIDs: formFactors.map(({id}) => id),
                laneSizeID: laneSizeID as number,
                versionID: versionID as number,
            };

            const response = await configuratorApiClient.Post<M2Slot>(`api/M2/M2Slots`, slot);

            if(!response.error) {
                revalidateTag('M2Slots');
                redirect(`/catalogue/m2/slots/${response.data?.id}`)
            }
        }
    }

    const slotParams = await getSlotParams() ?? undefined;

    return (
        <Form action={submitAction} slotParams={slotParams} />
    )
}