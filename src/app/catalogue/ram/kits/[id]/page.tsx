import {BackButton, Content, Controls, Body, FormModule, Footer, Row, BackLink} from '@/app/catalogue/_templates/view';
import {configuratorApiClient} from '@/server/catalogue';
import {MemoryKitParams, MemoryKit, MemoryKitDbo} from '@/server/models';
import {revalidateTag} from 'next/cache';
import {redirect} from 'next/navigation';
import {Component, Kit} from './forms';
import {Key} from 'react-aria-components';



export default async function Page({ params } : { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);

    async function getKitParams() {
        'use server';
        const response = await configuratorApiClient.Get<MemoryKitParams>('api/Memory/MemoryKits/params', ['MemoryKits', 'MemorySizes', 'MemoryFormFactors', 'Manufacturers']);
        return response.data;
    }

    async function getKit(id: number) {
        const response = await configuratorApiClient.Get<MemoryKit>(`api/Memory/MemoryKits/id/${id}`, ['MemoryKits'])
        return response.data;
    }

    async function submitComponentAction(sku: string, name: string, displayName: string, regularPrice: number | null | undefined, salePrice: number | null, onSale: boolean, saleable: boolean, manufacturerID: Key | null) {
        'use server'
        const response = await configuratorApiClient.Put<MemoryKitDbo>(`api/Memory/MemoryKits/id/${id}`,
        {
            sku, name,
            displayName,
            regularPrice: (regularPrice as number),
            salePrice: (salePrice as number),
            onSale,
            saleable,
            manufacturerID: (manufacturerID as number) ?? undefined,
            })
        console.log(response);
        if(!response.error) {
            revalidateTag('MemoryKits');
            redirect(`/catalogue/ram/kits/${id}`)
        }
    }

    async function submitKitAction(formFactorID: Key | null, typeID: Key | null, size: Key | null, height: number | null | undefined, clockFrequency: number | null | undefined, isECC: boolean, isBuffered: boolean, moduleCount: number | null | undefined, casLatency: number | null, firstWordLatency: number | null | undefined, voltage: number | null, timing: string) {
        'use server'

        const body = {
            formFactorID: (formFactorID as number) ?? undefined,
            typeID: (typeID as number) ?? undefined,
            size: (size as number) ?? undefined,
            height: height ?? undefined,
            clockFrequency: clockFrequency ?? undefined,
            isECC: isECC ?? undefined,
            isBuffered: isBuffered ?? undefined,
            moduleCount: moduleCount ?? undefined,
            casLatency: casLatency ?? undefined,
            firstWordLatency: firstWordLatency ?? undefined,
            voltage: voltage ?? undefined,
            timing: timing ?? undefined
        }
        console.log(body);
        const response = await configuratorApiClient.Put<MemoryKitDbo>(`api/Memory/MemoryKits/id/${id}`,
            {
                formFactorID: (formFactorID as number) ?? undefined,
                typeID: (typeID as number) ?? undefined,
                size: (size as number) ?? undefined,
                height: height ?? undefined,
                clockFrequency: clockFrequency ?? undefined,
                isECC: isECC ?? undefined,
                isBuffered: isBuffered ?? undefined,
                moduleCount: moduleCount ?? undefined,
                casLatency: casLatency ?? undefined,
                firstWordLatency: firstWordLatency ?? undefined,
                voltage: voltage ?? undefined,
                timing: timing ?? undefined
            })
        console.log(response);
        if(!response.error) {
            revalidateTag('MemoryKits');
            redirect(`/catalogue/ram/kits/${id}`)
        }
    }



    const kit = (await getKit(id))!;
    const kitParams= (await getKitParams()) ?? undefined
    return (
        <Body>
            <Controls>
                <BackLink />
            </Controls>
            <Component kit={kit} kitParams={kitParams} action={submitComponentAction}/>
            <Kit kit={kit} kitParams={kitParams} action={submitKitAction} />
        </Body>
    )
}