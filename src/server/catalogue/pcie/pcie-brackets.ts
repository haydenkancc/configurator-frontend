'use server';

import {BaseController} from '@/server/catalogue';
import {revalidatePath} from 'next/cache';
import {redirect, RedirectType} from 'next/navigation';
import {PCIeBracket, PCIeBracketRow} from '@/server/models';


const baseController = new BaseController(`${process.env.apiHost}/api/PCIeBrackets`)

export async function ListPCIeBrackets(pageIndex: number, pageSize: number) {
    return await baseController._list<PCIeBracketRow>(pageIndex, pageSize);
}

export async function GetPCIeBracket(id: number) {
    return await baseController._get<PCIeBracket>(id);
}

export async function PutPCIeBracket(id: number, formData: FormData): Promise<void> {
    const success = await baseController._put(id, JSON.stringify(Object.fromEntries(formData)))
    if (success) {
        revalidatePath('/catalogue/pcie/brackets', 'layout');
        redirect(`/catalogue/pcie/brackets/${id}`)
    }
}

export async function PostPCIeBracket(formData: FormData): Promise<void> {
    const response = await baseController._post<PCIeBracket>(JSON.stringify(Object.fromEntries(formData)))
    if (response) {
        revalidatePath('/catalogue/pcie/brackets', 'layout');
        redirect(`/catalogue/pcie/brackets/${response.id}`)
    }
}

export async function DeletePCIeBracket(id: number) {
    const success = await baseController._delete(id);
    if (success) {
        revalidatePath('/catalogue/pcie/brackets', 'layout');
    }

}

