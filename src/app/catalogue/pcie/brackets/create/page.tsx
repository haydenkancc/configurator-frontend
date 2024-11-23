import { Form } from './form';
import {PCIeBracket, PCIeBracketDbo} from '@/server/models';
import {configuratorApiClient} from '@/server/catalogue';
import {revalidateTag} from 'next/cache';
import {redirect} from 'next/navigation';

export default async function Page() {

    async function submitAction(name: string) {
        'use server'
        const bracket: PCIeBracketDbo = {
            name: name,
        };
        const response = await configuratorApiClient.Post<PCIeBracket>('api/PCIe/PCIeBrackets', bracket, ['PCIeBrackets']);
        console.log(response);
        if (!response.error) {
            revalidateTag('PCIeBrackets');
            redirect(`/catalogue/pcie/brackets/${response.data?.id}`)
        }
    }

    return (
        <Form action={submitAction} />
    )
}