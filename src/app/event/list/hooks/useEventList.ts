import { useEffect, useState } from "react";
import { Event } from "@/types/EventType";

export default function useEventList() {
  // TODO: Remover posteriormente
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [events, setEvents] = useState<Event[]>([]);

  async function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function fetchAllEventJSONServer(): Promise<Event[] | null> {
    await delay(1000);

    const response = await fetch(
      `${process.env.EXPO_PUBLIC_JSON_SERVER_API_URL}/events`
    );

    return await response.json();
  }

  async function fetchAllEvent(): Promise<Event[] | null> {
    try {
      return await fetchAllEventJSONServer();
    } catch (error) {
      console.log(error);
      setIsError(true);
      return null;
    }
  }

  useEffect(() => {
    async function fetchSetEvents() {
      setIsLoading(true);
      const eventResponse = await fetchAllEvent();

      if (eventResponse) {
        setEvents(eventResponse);
      }
      setIsLoading(false);
    }
    fetchSetEvents();
  }, []);

  return {
    isError,
    isLoading,
    events,
  };

  /* TODO: Utilizar servidor real posteriormente

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

  */
}
