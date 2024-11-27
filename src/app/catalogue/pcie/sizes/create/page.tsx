import { Form } from './form';
import {PCIeSizeDbo, PCIeSize } from '@/server/models';
import {configuratorApiClient} from '@/server/catalogue';
import {revalidateTag} from 'next/cache';
import {redirect} from 'next/navigation';
import {getComponentParams, postComponentAction} from '@/server/catalogue/test';

export default async function Page() {

    const endpoint = '/api/PCIe/PCIeSizes'

    const submitAction = await postComponentAction(endpoint, '/catalogue/pcie/Sizes', ['PCIeSizes'])

    return (
        <Form action={submitAction} />
    )
}