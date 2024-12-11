import {Form} from './form';
import {postComponentAction} from '@/server/controllers/test';

export default async function Page() {

    const endpoint = '/api/GraphicsProcessor/GraphicsProcessorChipsets'

    const submitAction = await postComponentAction(endpoint, ['GraphicsProcessorChipsets'])

    return (
        <Form action={submitAction}/>
    )
}