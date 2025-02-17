import { CertificaUTFEndpoint } from "@/src/api/endpoint/certificautf/CertificaUTFEndpoint";

import { Result } from "@/types/api/endpoin/certificautf/Result";

export class CertificaUTFEventParticipantEndpoint extends CertificaUTFEndpoint {

    constructor( token : string | null = null ) {
        super( token );
    }

    public async subscribe( nrUuidParticipant : string, idEvent : string ) : Promise<Result> {

        try {

            const request = {
                idEvent
            }

            const response = await this.httpClient.post( 
                `/api/event/participant/${nrUuidParticipant}/subscribe`,
                request
            );

            if( !response.ok ) {
                throw new Error("Falha ao se inscrever no evento!")
            }

            const data = await response.json();

            return {
                success: true,
                data,
                message: "Successo ao se inscrever no evento!"
            }

        } catch ( error ) {

            console.error( error );

            return {
                success: false,
                data: null,
                message: "Falha ao se inscrever no evento!"
            }
        }
    }

    public async remove( nrUuidParticipant : string, idEvent : string ) : Promise<Result> {

        try {

            const request = {
                idEvent
            }

            const response = await this.httpClient.delete( 
                `/api/event/participant/${nrUuidParticipant}/remove`,
                request
            );

            if( !response.ok ) {
                throw new Error("Falha ao sair do evento!")
            }

            const data = await response.json();

            return {
                success: true,
                data,
                message: "Successo ao remover participante do evento!"
            }

        } catch ( error ) {

            console.error( error );

            return {
                success: false,
                data: null,
                message: "Falha ao remover participante do evento!"
            }
        }
    }

    public async isSubscribed( nrUuidParticipant : string, idEvent : string ) : Promise<Result> {

        try {

            const request = {
                idEvent
            }

            const response = await this.httpClient.get( 
                `/api/event/participant/subscribed?id=${nrUuidParticipant}&idEvent=${idEvent}`,
                request
            );

            const data = await response.json();

            return {
                success: true,
                data,
                message: "Sucesso ao validar se o usuario esta inscrito no evento!"
            }

        } catch ( error ) {

            console.error( error );

            return {
                success: false,
                data: null,
                message: "Falha ao validar se o usuario esta inscrito no evento!"
            }
        }
    }
}