'use server';

import {BaseController} from '@/server/catalogue';
import {revalidatePath} from 'next/cache';
import {redirect} from 'next/navigation';
import {PCIeSize, PCIeSizeRow} from '@/server/models';


const baseController = new BaseController(`${process.env.apiHost}/api/PCIe/PCIeSizes`)

export async function ListPCIeSizes(pageIndex: number, pageSize: number) {
    return await baseController._list<PCIeSizeRow>(pageIndex, pageSize);
}

export async function GetPCIeSize(id: number) {
    return await baseController._get<PCIeSize>(id);
}

export async function PutPCIeSize(id: number, formData: FormData): Promise<void> {
    console.log(JSON.stringify(Object.fromEntries(formData)));
    const success = await baseController._put(id, JSON.stringify(Object.fromEntries(formData)))
    if (success) {
        revalidatePath('/catalogue/pcie/sizes', 'layout');
        redirect(`/catalogue/pcie/sizes/${id}`)
    }
}

export async function PostPCIeSize(formData: FormData): Promise<void> {
    console.log(JSON.stringify(Object.fromEntries(formData)))
    const response = await baseController._post(JSON.stringify(Object.fromEntries(formData)))
    if (response) {
        revalidatePath('/catalogue/pcie/sizes', 'layout');
        redirect(`/catalogue/pcie/sizes/${response.id}`)
    }
}

export async function DeletePCIeSize(id: number) {
    const success = await baseController._delete(id);
    if (success) {
        revalidatePath('/catalogue/pcie/sizes', 'layout');
        redirect(`/catalogue/pcie/sizes`);
    }

}

