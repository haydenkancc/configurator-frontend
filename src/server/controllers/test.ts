'use server'

import {ApiClient} from '@/server/controllers';
import {PaginatedList} from '@/server/models';
import {revalidateTag} from 'next/cache';

const apiClient = new ApiClient(`${process.env.apiHost}`)

export async function getComponentParams<T>(endpoint: string, tags?: string[]) {
    const response = await apiClient.Get<T>(endpoint + '/params', tags)
    // console.log(response);
    return response;
}

export async function getComponent<T>(endpoint: string, id: number, tags?: string[]) {
    const response = await apiClient.Get<T>(endpoint + `/id/${id}`, tags)
    // console.log(response);
    return response;
}

export async function getComponents<T>(endpoint: string, pageIndex = 1, pageSize = 20, tags?: string[]) {
    const response = await apiClient.Get<PaginatedList<T>>(`${endpoint}?pageIndex=${pageIndex}&pageSize=${pageSize}`, tags)
    return response.data;
}

export async function deleteComponentAction(endpoint: string, tags?: string[]) {
    return async function deleteComponent(id: number) {
        'use server'
        const response = await apiClient.Delete<null>(endpoint + `/id/${id}`);
        console.log(response);
        if(response.ok)
        {
            if (tags) {
                for (const tag of tags) {
                    revalidateTag(tag);
                }
            }
            return true;
        }
        return false;
    }
}


export async function postComponentAction(endpoint: string, tags?: string[]) {
    return async function postComponent(body: unknown) {
        'use server'
        console.log(body);
        const response = await apiClient.Post<{ id?: number, componentID?: number, }>(endpoint, body);
        console.log(response);
        if (response.ok) {
            if (tags) {
                for (const tag of tags) {
                    revalidateTag(tag);
                }
            }
            return response.data?.componentID ?? response.data?.id ?? null;
        } else {
            return null;
        }
    }
}

export async function putComponentAction(endpoint: string, id: number, tags?: string[]) {
    return async function putComponent(body: unknown) {
        'use server'
        console.log(body);
        const response = await apiClient.Put<null>(endpoint + `/id/${id}`, body);
        console.log(response);
        if (response.ok) {
            if (tags) {
                for(const tag of tags) {
                    revalidateTag(tag);
                }
            }
            return true;
        }
        return false;
    }
}
