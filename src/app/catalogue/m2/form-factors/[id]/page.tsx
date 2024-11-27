import {M2FormFactor, M2FormFactorDbo} from '@/server/models';
import {revalidateTag} from 'next/cache';
import {Form} from './form';
import {getComponent, getComponentParams, putComponentAction} from '@/server/catalogue/test';


export default async function Page({ params } : { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const endpoint = '/api/M2/M2FormFactors'

    const formFactor = (await getComponent<M2FormFactor>(endpoint, id, ['M2FormFactors'])).data;

    const action = await putComponentAction(endpoint, id, ['M2FormFactors'])

    return (
        <Form item={formFactor} action={action}/>
    )
}