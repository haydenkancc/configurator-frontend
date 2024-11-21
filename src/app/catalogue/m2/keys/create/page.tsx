import {BackLink, Content, Controls, FormBody, Module, Row} from '@/app/catalogue/_templates/view';
import {Button} from '@/components/ui/button';
import {PostPCIeSize} from '@/server/catalogue/pcie/pcie-sizes';
import NumberField from '@/components/ui/number-field';
import TextField from '@/components/ui/text-field';
import {UploadSimple} from '@phosphor-icons/react/dist/ssr';
import {Form} from './form';
import {GetM2KeyParams, PostM2Key} from '@/server/catalogue/m2/m2-keys';
import {M2KeyBase, M2KeyDbo} from '@/server/models';

export default async function Page() {

    const keyParams = await GetM2KeyParams();

    async function submitAction(name: string, compatibleKeys: M2KeyBase[]) {
        'use server'
        const key: M2KeyDbo = {
            name: name,
            compatibleKeyIDs: compatibleKeys.map(({id}) => id),
        };
        await PostM2Key(key);
    }

    return (
        <Form action={submitAction} keyParams={keyParams} />
    )
}