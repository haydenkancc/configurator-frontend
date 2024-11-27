import { Form } from './form';
import {PCIeVersionDbo, PCIeVersion } from '@/server/models';
import {configuratorApiClient} from '@/server/catalogue';
import {revalidateTag} from 'next/cache';
import {redirect} from 'next/navigation';
import {getComponentParams, postComponentAction} from '@/server/catalogue/test';

export default async function Page() {

    const endpoint = '/api/PCIe/PCIeVersions'

    const submitAction = await postComponentAction(endpoint, '/catalogue/pcie/Versions', ['PCIeVersions'])

    return (
        <Form action={submitAction} />
    )
}