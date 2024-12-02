import { FetchWrapper } from "@/src/helper/FetchWrapper";

export class CertificaUTFEndpoint {

    protected httpClient : FetchWrapper;

    constructor( token : string | null = null ) {
        this.httpClient = new FetchWrapper( this.baseUrl, token );
    }

    protected baseUrl : string = process.env.EXPO_PUBLIC_API_URL_CERTIFICA_UTF as string;

}