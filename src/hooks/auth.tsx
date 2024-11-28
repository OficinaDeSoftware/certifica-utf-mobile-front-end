import { router } from 'expo-router';
import { useContext, createContext, type PropsWithChildren, useState} from 'react';
import { useStorageState } from './useStorageState';
import { CertificaUTFAuthEndpoint } from '@/src/api/endpoint/certificautf/CertificaUTFAuthEndpoint';
import { SessionType } from "@/types/SessionType";
import { Result } from "@/types/api/endpoin/certificautf/Result"

interface AuthProps {
    signIn: ( ra: string, password: string ) => void;
    signOut: () => void;
    session?: SessionType | null;
    isLoading: boolean;
    error: string | null;
}

const AuthContext = createContext<AuthProps>({
  signIn: ( ra: string, password: string ) => null,
  signOut: () => null,
  session: null,
  isLoading: false,
  error: null,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

const signIn = async( ra: string, password: string, setSession: any, setError: any, setLoading: any ) => {

    setLoading(true);

    const endpoint = new CertificaUTFAuthEndpoint();

    const result : Result = await endpoint.singIn( ra, password );

    setLoading(false);

    if( !result.success ) {
        setError( result.message );
        return;
    }

    setSession( JSON.stringify( result.data ) );

    router.replace('/event/list');

}

export function SessionProvider({ children }: PropsWithChildren) {
  const [ [ _, sessionStorage ], setSession] = useStorageState('session');
  const [ error, setError ] = useState<string | null>(null);
  const [ isLoading, setLoading ] = useState(false);

  const session : SessionType | null = sessionStorage ? JSON.parse( sessionStorage ) : null;

  return (
    <AuthContext.Provider
      value={{
        signIn: async ( ra: string, password: string ) => {
            await signIn( ra, password, setSession, setError, setLoading );
        } ,
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
        error
      }}>
      {children}
    </AuthContext.Provider>
  );
}
