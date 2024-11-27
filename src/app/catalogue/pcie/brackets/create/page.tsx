import { Form } from './form';
import {PCIeBracketDbo, PCIeBracket } from '@/server/models';
import {configuratorApiClient} from '@/server/catalogue';
import {revalidateTag} from 'next/cache';
import {redirect} from 'next/navigation';
import {getComponentParams, postComponentAction} from '@/server/catalogue/test';

export default async function Page() {

    const endpoint = '/api/PCIe/PCIeBrackets'

    const submitAction = await postComponentAction(endpoint, '/catalogue/pcie/brackets', ['PCIeBrackets'])

    return (
        <Form action={submitAction} />
    )
}