'use server';

import {BaseController} from '@/server/catalogue';
import {revalidatePath} from 'next/cache';
import {redirect, RedirectType} from 'next/navigation';
import {PCIeSlotRow} from "@/server/models";

const baseController = new BaseController(`${process.env.apiHost}/api/PCIeSlots`)

export async function ListPCIeSlots(pageIndex: number, pageSize: number) {
    return await baseController._list<PCIeSlotRow>(pageIndex, pageSize);
}