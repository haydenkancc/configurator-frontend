import {configuratorApiClient} from '@/server/catalogue';
import {PCIeSize, PCIeSizeDbo} from '@/server/models';
import {revalidateTag} from 'next/cache';
import {Form} from './form';
import {getComponent, getComponentParams, putComponentAction} from '@/server/catalogue/test';


export default async function Page({ params } : { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const endpoint = '/api/PCIe/PCIeSizes'

    const size = (await getComponent<PCIeSize>(endpoint, id, ['PCIeSizes'])).data;

    const action = await putComponentAction(endpoint, id, ['PCIeSizes'])

    return (
        <Form item={size} action={action}/>
    )
}