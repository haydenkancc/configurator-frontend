import {configuratorApiClient} from '@/server/catalogue';
import {PCIeVersion, PCIeVersionDbo} from '@/server/models';
import {revalidateTag} from 'next/cache';
import {Form} from './form';
import {getComponent, getComponentParams, putComponentAction} from '@/server/catalogue/test';


export default async function Page({ params } : { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const endpoint = '/api/PCIe/PCIeVersions'

    const version = (await getComponent<PCIeVersion>(endpoint, id, ['PCIeVersions'])).data;

    const action = await putComponentAction(endpoint, id, ['PCIeVersions'])

    return (
        <Form item={version} action={action}/>
    )
}