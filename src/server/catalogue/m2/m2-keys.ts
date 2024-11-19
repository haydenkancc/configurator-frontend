'use server';

import {BaseController} from '@/server/catalogue';
import {revalidatePath} from 'next/cache';
import {redirect} from 'next/navigation';
import {M2Key, M2KeyParams, M2KeyRow} from '@/server/models';


const baseController = new BaseController(`${process.env.apiHost}/api/M2/M2Keys`)

export async function ListM2Keys(pageIndex: number, pageSize: number) {
    return await baseController._list<M2KeyRow>(pageIndex, pageSize);
}

export async function GetM2Key(id: number) {

    var poop = await baseController._get<M2Key>(id);
    console.log(poop);
    return poop;
}

export async function GetM2KeyParams() {
    return await baseController._params<M2KeyParams>();
}

export async function PutM2Key(id: number, formData: FormData): Promise<void> {
    const success = await baseController._put(id, JSON.stringify(Object.fromEntries(formData)))
    if (success) {
        revalidatePath('/catalogue/m2/keys', 'layout');
        redirect(`/catalogue/m2/keys/${id}`)
    }
}

export async function PostM2Key(formData: FormData): Promise<void> {
    const response = await baseController._post(JSON.stringify(Object.fromEntries(formData)))
    if (response) {
        revalidatePath('/catalogue/m2/keys', 'layout');
        redirect(`/catalogue/m2/keys/${response.id}`)
    }
}

export async function DeleteM2Key(id: number) {
    const success = await baseController._delete(id);
    if (success) {
        revalidatePath('/catalogue/pcie/brackets', 'layout');
    }

}

