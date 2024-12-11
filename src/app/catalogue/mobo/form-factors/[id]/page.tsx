import {MotherboardFormFactor} from '@/server/models/components';
import {Form} from './form';
import {getComponent, putComponentAction} from '@/server/controllers/test';


export default async function Page({ params } : { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const endpoint = '/api/Motherboard/MotherboardFormFactors'

    const formFactor = (await getComponent<MotherboardFormFactor>(endpoint, id, ['MotherboardFormFactors'])).data;

    const action = await putComponentAction(endpoint, id, ['MotherboardFormFactors'])

    return (
        <Form item={formFactor} action={action}/>
    )
}