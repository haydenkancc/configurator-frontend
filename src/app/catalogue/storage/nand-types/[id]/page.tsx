import { Storage } from '@/server/models/catalogue';
import {Form} from './form';
import {getComponent, putComponentAction} from '@/server/controllers/test';
import {CatalogueTags} from '@/server/models/catalogue/tags';


export default async function Page({params}: { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const endpoint = '/api/Storage/NandTypes'

    const nandType = (await getComponent<Storage.NandTypeDto>(endpoint, id, [CatalogueTags.STORAGE_NAND_TYPES])).data;

    const action = await putComponentAction(endpoint, id, [CatalogueTags.STORAGE_NAND_TYPES])

    return (
        <Form item={nandType} action={action} params={null}/>
    )
}