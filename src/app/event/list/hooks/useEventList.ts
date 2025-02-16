import { useEffect, useState } from "react";
import { useRequest } from "@/src/api/endpoint/certificautf/useRequest";
import { CertificaUTFEventEndpoint } from "@/src/api/endpoint/certificautf/CertificaUTFEventEndpoint";

export default function useEventList() {

    const { isLoading, error, fetchApi } = useRequest();
    const [events, setEvents] = useState<[]>([]);

    const handleEvents: () => Promise<void> = async (): Promise<void> => {
      await fetchApi({
        request: async (token) => {
          return new CertificaUTFEventEndpoint(token).findAll();
        },
        onSuccess: (result: any) => {
          setEvents(result);
        },
      });
    };

    useEffect(() => {
      handleEvents();
    }, []);

    return {
      isLoading,
      error,
      events,
    };

}
