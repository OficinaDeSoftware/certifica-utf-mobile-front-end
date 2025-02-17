import {CertificaUTFEndpoint} from "@/src/api/endpoint/certificautf/CertificaUTFEndpoint";

import { Result } from "@/types/api/endpoin/certificautf/Result";

export class CertificaUTFCheckinEndpoint extends CertificaUTFEndpoint {

    constructor( token : string | null = null ) {
        super( token );
    }

    public async checkin(idEvent: string, nrUuid: string) : Promise<Result> {

        try {
            const request = {
                nrUuidParticipant: nrUuid,
            }

            const response = await this.httpClient.post(`/api/event/${idEvent}/checkin`, request);

            if( !response.ok ) {
                throw new Error("Falha ao realizar checkin!")
            }

            const data = await response.json();

            return {
                success: true,
                data,
                message: "Succeso ao realizar o checkin!"
            }

        } catch ( error ) {

            console.log( error );

            return {
                success: false,
                data: null,
                message: "Falha ao realizar o checkin!"
            }
        }
    }

    public async checkout(idEvent: string, nrUuid: string) : Promise<Result> {

        try {
            const request = {
                nrUuidParticipant: nrUuid,
            }

            const response = await this.httpClient.post(`/api/event/${idEvent}/checkout`, request);

            if( !response.ok ) {
                throw new Error("Falha ao realizar checkout!")
            }

            const data = await response.json();

            return {
                success: true,
                data,
                message: "Succeso ao realizar o checkout!"
            }

        } catch ( error ) {

            console.log( error );

            return {
                success: false,
                data: null,
                message: "Falha ao realizar o checkout!"
            }
        }
    }
}