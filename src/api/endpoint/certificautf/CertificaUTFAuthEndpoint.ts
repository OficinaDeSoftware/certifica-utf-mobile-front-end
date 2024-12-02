import { Result, SignInRequest, ErrorResponse, SignInResponse } from "@/types/api/endpoin/certificautf/module"

import { CertificaUTFEndpoint } from "@/src/api/endpoint/certificautf/CertificaUTFEndpoint";

export class CertificaUTFAuthEndpoint extends CertificaUTFEndpoint {

    public async singIn( ra: string , password: string ) : Promise<Result> {

        const request : SignInRequest = {
            login: ra,
            password: password,
            typeProvider: 'UTFPR'
        }

        try {

            const response = await this.httpClient.post(
                '/api/auth/signIn',
                request
            )

            if( !response.ok ) {

                const errorResponse: ErrorResponse = await response.json();

                console.error( errorResponse.message );

                // TODO alterar apresentar a mensagem do back-end quando elas forem alteradas para português.

                return {
                    message: "Falha ao efetuar o login!",
                    success: false,
                };

            }

            const data: SignInResponse = await response.json();

            return {
                message: "Login efetuado com sucesso!",
                success: response.ok,
                data: data
            };

        } catch ( error ) {

            console.error( error );

            return {
                message: "Falha ao efetuar o login!",
                success: false,
            };

        }

    }

}