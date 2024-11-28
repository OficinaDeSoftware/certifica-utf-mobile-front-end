export class FetchWrapper {

    private readonly baseUrl: string;
    private readonly token: string | null;

    constructor( baseUrl: string, token: string | null = null ) {
        this.baseUrl = baseUrl;
        this.token = token;
    }

    private getHeaders( headers: HeadersInit = {} ): HeadersInit {

        const authHeaders: HeadersInit = this.token ? { "Authorization": `${this.token}` } : {};

        return {
            ...headers,
            ...authHeaders,
            "Content-Type": "application/json"
        };
    }

    private async request( endpoint: string, options: RequestInit = {} ): Promise<Response> {

        const url = `${this.baseUrl}${endpoint}`;
        const headers = this.getHeaders(options.headers);

        const config: RequestInit = {
            ...options,
            headers
        };
        
        return await fetch(url, config);

    }

    public async post ( endpoint: string, body: any, headers: HeadersInit = {}): Promise<Response> {
        return this.request( endpoint, {
            method: 'POST',
            body: JSON.stringify( body ),
            headers,
        });
    };

    public async get ( endpoint: string, headers: HeadersInit = {}): Promise<Response> {
        return this.request( endpoint, {
            method: 'GET',
            headers,
        });
    };
}