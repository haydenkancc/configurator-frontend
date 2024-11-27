import { Form } from './form';
import {M2FormFactorDbo, M2FormFactor } from '@/server/models';
import {configuratorApiClient} from '@/server/catalogue';
import {revalidateTag} from 'next/cache';
import {redirect} from 'next/navigation';
import {getComponentParams, postComponentAction} from '@/server/catalogue/test';

export default async function Page() {

    const endpoint = '/api/M2/M2FormFactors'

    const submitAction = await postComponentAction(endpoint, '/catalogue/m2/formFactors', ['M2FormFactors'])

    return (
        <Form action={submitAction} />
    )
}