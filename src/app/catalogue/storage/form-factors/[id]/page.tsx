import {CaseStorageFormFactor} from '@/server/models/components';
import {Form} from './form';
import {getComponent, putComponentAction} from '@/server/controllers/test';


export default async function Page({ params } : { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const endpoint = '/api/Storage/CaseStorageFormFactors'

    const formFactor = (await getComponent<CaseStorageFormFactor>(endpoint, id, ['CaseStorageFormFactors'])).data;

    const action = await putComponentAction(endpoint, id, ['CaseStorageFormFactors'])

    return (
        <Form item={formFactor} action={action}/>
    )
}