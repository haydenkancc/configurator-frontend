import { Form } from './form';
import {MemoryType, MemoryTypeDbo, MemoryKitParams, MemoryKitDbo} from '@/server/models';
import {configuratorApiClient} from '@/server/catalogue';
import {revalidateTag} from 'next/cache';
import {redirect} from 'next/navigation';
import {Key} from 'react-aria-components';

export default async function Page() {

    async function getKitParams() {
        'use server';
        const response = await configuratorApiClient.Get<MemoryKitParams>('api/Memory/MemoryKits/params', ['MemoryTypes', 'MemorySizes', 'MemoryFormFactors', 'Manufacturers']);
        return response.data;
    }
    
    async function submitAction(sku: string, name: string, displayName: string, regularPrice: number | null | undefined, salePrice: number | null, onSale: boolean, saleable: boolean, manufacturerID: Key | null, formFactorID: Key | null, typeID: Key | null, size: Key | null, height: number | null | undefined, clockFrequency: number | null | undefined, isECC: boolean, isBuffered: boolean, moduleCount: number | null | undefined, casLatency: number | null, firstWordLatency: number | null | undefined, voltage: number | null, timing: string) {
        'use server'
        if (sku && name && displayName && regularPrice && manufacturerID && formFactorID && typeID && size && height && clockFrequency && moduleCount && casLatency && firstWordLatency && voltage && timing)
        {
            const kit: MemoryKitDbo = {
                sku, name,
                displayName,
                regularPrice: (regularPrice as number),
                salePrice: (salePrice as number) ?? undefined,
                onSale,
                saleable,
                manufacturerID: (manufacturerID as number),
                formFactorID: (formFactorID as number),
                typeID: (typeID as number),
                size: (size as number),
                height,
                clockFrequency,
                isECC,
                isBuffered,
                moduleCount,
                casLatency,
                firstWordLatency,
                voltage, timing
            };

            console.log(kit);
            const response = await configuratorApiClient.Post<MemoryType>('api/Memory/MemoryKits', kit,
                ['MemoryKits']);
            console.log(response);
            if (!response.error) {
                revalidateTag('MemoryKits');
                redirect(`/catalogue/ram/kits/${response.data?.id}`)
            }
        }
    }

    const kitParams = await getKitParams() ?? undefined;

    return (
        <Form kitParams={kitParams} action={submitAction} />
    )
}