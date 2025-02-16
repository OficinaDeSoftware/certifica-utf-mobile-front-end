import {CertificaUTFEndpoint} from "@/src/api/endpoint/certificautf/CertificaUTFEndpoint";

import { Result } from "@/types/api/endpoin/certificautf/Result";

export class CertificaUTFEventEndpoint extends CertificaUTFEndpoint {

    constructor( token : string | null = null ) {
        super( token );
    }

    public async findAll() : Promise<Result> {

        try {

            const response = await this.httpClient.get( "/api/event" );

            const data = await response.json();

            return {
                success: true,
                data,
                message: "Succeso ao buscar eventos!"
            }

        } catch ( error ) {

            console.error( error );

            return {
                success: false,
                data: null,
                message: "Falha ao buscar eventos!"
            }
        }
    }

    public async findOne( idEvent : string ) : Promise<Result> {

        try {

            const response = await this.httpClient.get( `/api/event/${idEvent}`);

            const data = await response.json();

            return {
                success: true,
                data,
                message: "Succeso ao buscar evento!"
            }

        } catch ( error ) {

            console.error( error );

            return {
                success: false,
                data: null,
                message: "Falha ao buscar evento!"
            }
        }
    }
}