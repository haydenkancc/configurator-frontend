export class BaseController {
    protected baseRoute : string;

    constructor(baseRoute : string) {
        this.baseRoute = baseRoute;
    }

    public async _list<T>(pageIndex: number, pageSize: number): Promise<T[]> {
        return await (await fetch(`${this.baseRoute}?pageIndex=${pageIndex}&pageSize=${pageSize}`,{
            method: "GET",
            cache: 'force-cache'
        })).json()
    }

    async _get<T>(id: number): Promise<T> {
        return await (await fetch(`${this.baseRoute}/${id}`,{
            method: "GET",
            cache: 'force-cache'
        })).json()
    }
    public async _put(id: number, body: string): Promise<boolean> {
        console.log(body)
        try {
            const response = await fetch(`${this.baseRoute}/${id}`,{
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

    public async _post<T>(body: string): Promise<T | null> {
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
            return (await response.json() as T);
        } catch (error: any) {
            console.error(error.message);
            return null;
        }

    }

    public async _delete(id: number): Promise<boolean> {
        try {
            const response = await fetch(`${this.baseRoute}/${id}`,{
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

