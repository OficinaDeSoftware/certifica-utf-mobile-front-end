import { router } from 'expo-router';
import { useContext, createContext, type PropsWithChildren, useState} from 'react';
import { useStorageState } from './useStorageState';
import { CertificaUTFEndpoint } from '@/src/api/endpoint/certificautf/CertificaUTFEndpoint';

interface AuthProps {
    signIn: ( ra: string, password: string ) => void;
    signOut: () => void;
    session?: string | null;
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

    const endpoint = new CertificaUTFEndpoint();

    const response = await endpoint.singIn( ra, password );

    setLoading(false);

    if( !response.success ) {
        setError( response.message );
        return;
    }

    setSession('xxx');

    router.replace('/event/detail');

}

export function SessionProvider({ children }: PropsWithChildren) {
  const [ [ isLoading, session ], setSession] = useStorageState('session');
  const [ error, setError ] = useState<string | null>(null);
  const [ loading, setLoading ] = useState(false);

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
        isLoading: loading,
        error
      }}>
      {children}
    </AuthContext.Provider>
  );
}
