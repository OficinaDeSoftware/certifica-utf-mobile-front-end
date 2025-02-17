import {useState} from "react";
import { Result } from "@/types/api/endpoin/certificautf/Result"
import {useSession} from "@/src/hooks/auth";

interface RequestOptions {
    request: ( token : string | null | undefined ) => Promise<Result>;
    onSuccess: ( result: any ) => void;
}

export function useRequest() {

    const [ isLoading, setIsLoading] = useState<boolean>( false )
    const [ error, setError ] = useState<string | undefined | null>( undefined )
    const { session } = useSession();

    async function fetchApi( { request, onSuccess } : RequestOptions) : Promise<boolean> {

        setIsLoading( true );

        const result = await request( session?.accessToken );

        if( result.success ) {
            onSuccess( result.data );
        } else {
            setError( result.message );
        }

        setIsLoading( false );

        return result.success;

    }

    return { isLoading, error, fetchApi }

}