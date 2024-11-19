'use server';

import {BaseController} from '@/server/catalogue';
import {revalidatePath} from 'next/cache';
import {redirect} from 'next/navigation';
import {PCIeSlot, PCIeSlotParams, PCIeSlotRow} from "@/server/models";

const baseController = new BaseController(`${process.env.apiHost}/api/PCIe/PCIeSlots`)

export async function ListPCIeSlots(pageIndex: number, pageSize: number) {
    return await baseController._list<PCIeSlotRow>(pageIndex, pageSize);
}

export async function GetPCIeSlot(id: number) {
    return await baseController._get<PCIeSlot>(id);
}

export async function GetPCIeSlotParams() {
    return await baseController._params<PCIeSlotParams>();
}

export async function PostPCIeSlot(formData: FormData): Promise<void> {
    console.log(JSON.stringify(Object.fromEntries(formData)))
    const response = await baseController._post(JSON.stringify(Object.fromEntries(formData)))
    if (response) {
        revalidatePath('/catalogue/pcie/slots', 'layout');
        redirect(`/catalogue/pcie/slots/${response.id}`);
    }
}

export async function PutPCIeSlot(id: number, formData: FormData): Promise<void> {
    const success = await baseController._put(id, JSON.stringify(Object.fromEntries(formData)))
    if (success) {
        revalidatePath('/catalogue/pcie/slots', 'layout');
        redirect(`/catalogue/pcie/slots/${id}`)
    }
}

export async function DeletePCIeSlot(id: number) {
    const success = await baseController._delete(id);
    if (success) {
        revalidatePath('/catalogue/pcie/slots', 'layout');
        redirect(`/catalogue/pcie/slots`);
    }

}