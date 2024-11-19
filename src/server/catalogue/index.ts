import {PaginatedList, SearchParams} from '@/server/models';

export class BaseController {
    protected baseRoute : string;

    constructor(baseRoute : string) {
        this.baseRoute = baseRoute;
    }

    public async _list<T>(pageIndex: number, pageSize: number): Promise<PaginatedList<T> | undefined> {
        try {
            const response = await fetch(`${this.baseRoute}?pageIndex=${pageIndex}&pageSize=${pageSize}`,{
                method: "GET",
                cache: 'force-cache'
            })
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            return await response.json()
        } catch (error: any) {
            console.error(error.message);
        }
    }

    public async _get<T>(id: number): Promise<T> {
        return await (await fetch(`${this.baseRoute}/id/${id}`,{
            method: "GET",
            // cache: 'force-cache'
        })).json()
    }

    public async _params<T>(): Promise<T | undefined> {
        try {
            const response = await fetch(`${this.baseRoute}/params`,{
                method: "GET",
            })
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            return await response.json()
        } catch (error: any) {
            console.error(error.message);
        }
    }

    public async _put(id: number, body: string): Promise<boolean> {
        console.log(body)
        try {
            const response = await fetch(`${this.baseRoute}/id/${id}`,{
                method: "PUT",
                headers: [
                    ["Content-Type", "application/json"]
                ],
                body: body,
            })
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            return true;
        } catch (error: any) {
            console.error(error.message);
            return false;
        }
    }

    public async _post(body: string): Promise<{ id: number } | null> {
        try {
            const response = await fetch(`${this.baseRoute}`,{
                method: "POST",
                headers: [
                    ["Content-Type", "application/json"]
                ],
                body: body,
            })
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            return (await response.json());
        } catch (error: any) {
            console.error(error.message);
            return null;
        }

    }

    public async _delete(id: number): Promise<boolean> {
        try {
            const response = await fetch(`${this.baseRoute}/id/${id}`,{
                method: "DELETE",
            })
            if (!response.ok) {
                throw new Error(`Response status: ${response.status}`);
            }
            return true;
        } catch (error: any) {
            console.error(error.message);
            return false;
        }
    }
}

export async function ReadPaginationData(searchParams : SearchParams) {
    const pageIndexParam = (await searchParams)["page"]
    const pageSizeParam = (await searchParams)["pageSize"]
    const pageIndex = pageIndexParam ? Array.isArray(pageIndexParam) ? 1 : parseInt(pageIndexParam) : 1;
    const pageSize = pageSizeParam ? Array.isArray(pageSizeParam) ? 20 : parseInt(pageSizeParam) : 20;
    return [ pageIndex, pageSize ]
}