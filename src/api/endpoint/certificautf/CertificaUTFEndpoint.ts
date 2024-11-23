import { FetchWrapper } from '@/src/helper/FetchWrapper';

import { Result, SignInRequest, ErrorResponse, SignInResponse } from "@/types/api/endpoin/certificautf/module"

export class CertificaUTFEndpoint {

    private baseUrl : string = process.env.EXPO_PUBLIC_API_URL_CERTIFICA_UTF as string;

    private getToken() : string | null {
        // TODO alterar para pegar do SessionStorage.
        return localStorage.getItem('token');
    }

    public async singIn( ra: string , password: string ) : Promise<Result> {

        const fetchWrapper = new FetchWrapper( this.baseUrl );

        const request : SignInRequest = {
            login: ra,
            password: password,
            typeProvider: 'UTFPR'
        }

        try {

            const response = await fetchWrapper.post(
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