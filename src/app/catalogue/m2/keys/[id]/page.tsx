import {
    BackLink,
    Content,
    Controls,
    Module,
    Body,
    FormModule,
    Footer,
    Row
} from '@/app/catalogue/_templates/view';
import {Button} from '@/components/ui/button';
import NumberField from '@/components/ui/number-field';
import {GetM2Key, GetM2KeyParams, PutM2Key} from '@/server/catalogue/m2/m2-keys';
import TextField from '@/components/ui/text-field';
import React from 'react';
import {Details, Keys} from '@/app/catalogue/m2/keys/[id]/forms';
import {M2KeyBase, M2KeyDbo} from '@/server/models';


export default async function Page({ params } : { params: Promise<{ id: string }> }) {
    const id = parseInt((await params).id);
    const key = await GetM2Key(id);
    const keyParams = await GetM2KeyParams();

    async function submitKeysAction(compatibleKeys: M2KeyBase[]) {
        'use server';
        const compatibleKeyIDs: M2KeyDbo["compatibleKeyIDs"] = compatibleKeys.map(({id}) => id);
        await PutM2Key(id, {compatibleKeyIDs: compatibleKeyIDs});
    }

    async function submitDetailsAction(name: string) {
        'use server'
        name && await PutM2Key(id, {name: name})
    }

    return (
        <Body>
            <Controls>
                <BackLink />
            </Controls>
            <Details m2key={key} action={submitDetailsAction} />
            <Keys m2key={key} keyParams={keyParams} action={submitKeysAction} />
        </Body>
    )
}