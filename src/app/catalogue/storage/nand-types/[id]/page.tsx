import {SolidStateDriveNandType} from '@/server/models/components';
import {Form} from './form';
import {getComponent, putComponentAction} from '@/server/controllers/test';


export default async function Page({params}: { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const endpoint = '/api/Storage/SolidStateDriveNandTypes'

    const type = (await getComponent<SolidStateDriveNandType>(endpoint, id, ['SolidStateDriveNandTypes'])).data;

    const action = await putComponentAction(endpoint, id, ['SolidStateDriveNandTypes'])

    return (
        <Form item={type} action={action}/>
    )
}