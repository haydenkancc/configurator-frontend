import {Form} from './form';
import {M2Key, M2KeyBase, M2KeyDbo, M2KeyParams} from '@/server/models';
import {configuratorApiClient} from '@/server/catalogue';
import {revalidateTag} from 'next/cache';
import {redirect} from 'next/navigation';

export default async function Page() {

    async function getKeyParams() {
        'use server';
        const response = await configuratorApiClient.Get<M2KeyParams>('api/M2/M2Keys/params', ['M2Keys']);
        return response.data;
    }

    async function submitAction(name: string, compatibleKeys: M2KeyBase[]) {
        'use server'
        const key: M2KeyDbo = {
            name: name,
            compatibleKeyIDs: compatibleKeys.map(({id}) => id),
        };
        const response = await configuratorApiClient.Post<M2Key>(`api/M2/M2Keys`, key);
        if(!response.error) {
            revalidateTag('M2Keys');
            redirect(`/catalogue/m2/keys/${response.data?.id}`)
        }
    }

    const keyParams = await getKeyParams() ?? undefined;

    return (
        <Form action={submitAction} keyParams={keyParams} />
    )
}