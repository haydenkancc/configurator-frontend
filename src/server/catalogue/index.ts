import {PaginatedList, SearchParams} from '@/server/models';

export async function ReadPaginationData(searchParams : SearchParams) {
    const pageIndexParam = (await searchParams)["page"]
    const pageSizeParam = (await searchParams)["pageSize"]
    const pageIndex = pageIndexParam ? Array.isArray(pageIndexParam) ? 1 : parseInt(pageIndexParam) : 1;
    const pageSize = pageSizeParam ? Array.isArray(pageSizeParam) ? 20 : parseInt(pageSizeParam) : 20;
    return [ pageIndex, pageSize ]
}



export type ApiResponse<T> = {
    data: T | null;
    error?: string;
    statusCode?: number;
}

class ApiClient
{
    private readonly _baseUrl: string;

    constructor(baseURL: string)
    {
        this._baseUrl = baseURL;
    }

    private async _request<T>(
        method: 'GET' | 'POST' | 'PUT' | 'DELETE',
        endpoint: string,
        headers: Record<string, string> = {},
        body?: unknown,
        tags?: string[],
    ): Promise<ApiResponse<T>>
    {
        try
        {
            const response = await fetch(`${this._baseUrl}${endpoint}`, {
                method,
                next: {
                  tags,
                },
                cache: 'force-cache',
                headers: {
                    'Content-Type': 'application/json',
                    ...headers,
                },
                body: body ? JSON.stringify(body) : undefined,
            });

            const contentType = response.headers.get('Content-Type');
            const isJson = contentType?.includes('application/json');

            const statusCode = response.status;
            if (!response.ok)
            {
                const error = isJson ? await response.json() : await response.text();
                return {
                    data: null,
                    error: error.message || error || 'An error occurred',
                    statusCode,
                }
            }

            const data = isJson ? await response.json() : null;
            return {
                data,
                statusCode,
            };
        }
        catch (error: any)
        {
            return {
                data: null,
                error: error.message || 'Unknown error occurred',
                statusCode: 0,
            }
        }
    }

    public Get<T>(
        endpoint: string,
        tags?: string[],
        headers?: Record<string, string>
    ): Promise<ApiResponse<T>>
    {
        return this._request<T>('GET', endpoint, headers, undefined, tags);
    }

    public Post<T>(
        endpoint: string,
        body: unknown,
        tags?: string[],
        headers?: Record<string, string>
    ): Promise<ApiResponse<T>>
    {
        return this._request<T>('POST', endpoint, headers, body, tags)
    }

    public Put<T>(
        endpoint: string,
        body: unknown,
        tags?: string[],
        headers?: Record<string, string>
    ): Promise<ApiResponse<T>>
    {
        return this._request<T>('PUT', endpoint, headers, body, tags)
    }

    public Delete<T>(
        endpoint: string,
        tags?: string[],
        headers?: Record<string, string>
    ): Promise<ApiResponse<T>>
    {
        return this._request<T>('DELETE', endpoint, headers, undefined, tags)
    }
}

export const configuratorApiClient = new ApiClient(`${process.env.apiHost}`)