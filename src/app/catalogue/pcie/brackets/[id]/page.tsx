import {configuratorApiClient} from '@/server/catalogue';
import {PCIeBracket, PCIeBracketDbo} from '@/server/models';
import {revalidateTag} from 'next/cache';
import {Form} from './form';
import {getComponent, getComponentParams, putComponentAction} from '@/server/catalogue/test';


export default async function Page({ params } : { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const endpoint = '/api/PCIe/PCIeBrackets'

    const bracket = (await getComponent<PCIeBracket>(endpoint, id, ['PCIeBrackets'])).data;

    const action = await putComponentAction(endpoint, id, ['PCIeBrackets'])

    return (
        <Form item={bracket} action={action}/>
    )
}