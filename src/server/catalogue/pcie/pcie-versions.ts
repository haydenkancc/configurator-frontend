'use server';

import {BaseController} from '@/server/catalogue';
import {revalidatePath} from 'next/cache';
import {redirect} from 'next/navigation';
import {PCIeVersion, PCIeVersionRow} from '@/server/models';


const baseController = new BaseController(`${process.env.apiHost}/api/PCIe/PCIeVersions`)

export async function ListPCIeVersions(pageIndex: number, pageVersion: number) {
    return await baseController._list<PCIeVersionRow>(pageIndex, pageVersion);
}

export async function GetPCIeVersion(id: number) {
    return await baseController._get<PCIeVersion>(id);
}

export async function PutPCIeVersion(id: number, formData: FormData): Promise<void> {
    console.log(JSON.stringify(Object.fromEntries(formData)));
    const success = await baseController._put(id, JSON.stringify(Object.fromEntries(formData)))
    if (success) {
        revalidatePath('/catalogue/pcie/versions', 'layout');
        redirect(`/catalogue/pcie/versions/${id}`)
    }
}

export async function PostPCIeVersion(formData: FormData): Promise<void> {
    console.log(JSON.stringify(Object.fromEntries(formData)))
    const response = await baseController._post(JSON.stringify(Object.fromEntries(formData)))
    if (response) {
        revalidatePath('/catalogue/pcie/versions', 'layout');
        redirect(`/catalogue/pcie/versions/${response.id}`)
    }
}

export async function DeletePCIeVersion(id: number) {
    const success = await baseController._delete(id);
    if (success) {
        revalidatePath('/catalogue/pcie/versions', 'layout');
        redirect(`/catalogue/pcie/versions`);
    }

}

