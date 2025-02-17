import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

import BackStackScreenButton from '@/src/components/backstackscreenbutton';

import { Event } from '@/types/EventType';
import { useLocalSearchParams } from 'expo-router';
import Card from './components/card';
import Description from './components/description';
import SubscribeParticipant from './components/subscribe-participant';
import CheckInParticipant from './components/check-in-participant';
import { CertificaUTFEventEndpoint } from '@/src/api/endpoint/certificautf/CertificaUTFEventEndpoint';
import { useRequest } from "@/src/api/endpoint/certificautf/useRequest";
import { useSession } from '@/src/hooks/auth';
import { CertificaUTFEventParticipantEndpoint } from '@/src/api/endpoint/certificautf/CertificaUTFEventParticipantEndpoint';
import RemoveParticipant from './components/remove-participant';
import { StyledButton } from '@/src/components/styledbutton';

export default function EventDetails() {

  const { id: eventId }: { id: string } = useLocalSearchParams();
  const [event, setEvent] = useState<Event | null>();
  const { isLoading, error, fetchApi } = useRequest();
  const { session } = useSession();
  const [ isSubscribed, setIsSubscribed ] = useState<boolean>( false )

  const isAdmin = session?.roles?.includes("ROLE_ADMIN")
  const nrUuidParticipant : string = session?.nrUuid as string;

  const handleSubscribeEvent: ( nrUuidParticipant : string, idEvent : string ) => Promise<void> = 
  async ( nrUuidParticipant : string, idEvent : string ): Promise<void> => {
    await fetchApi({
      request: async (token) => {
        return new CertificaUTFEventParticipantEndpoint( token ).subscribe(  nrUuidParticipant, idEvent );
      },
      onSuccess: (result: any) => {
          setIsSubscribed( true )
      },
    });
  };

  const handleRemoveSubscribe: ( nrUuidParticipant : string, idEvent : string ) => Promise<void> = 
  async ( nrUuidParticipant : string, idEvent : string ): Promise<void> => {
    await fetchApi({
      request: async (token) => {
        return new CertificaUTFEventParticipantEndpoint( token ).remove(  nrUuidParticipant, idEvent );
      },
      onSuccess: (result: any) => {
          setIsSubscribed( false )
      },
    });
  };

  const handleOnSubscribe: () => Promise<void> = async () : Promise<void> => {
    handleSubscribeEvent( nrUuidParticipant, eventId )
  }

  const handleOnRemoveSubscribe: () => Promise<void> = async () : Promise<void> => {
    handleRemoveSubscribe( nrUuidParticipant, eventId )
  }

  useEffect(() => {

    const handleParticipantIsSubscribed: () => Promise<void> = async (): Promise<void> => {
      await fetchApi({
        request: async (token) => {
          return new CertificaUTFEventParticipantEndpoint( token ).isSubscribed( nrUuidParticipant, eventId );
        },
        onSuccess: (result: any) => {
          setIsSubscribed( result?.subscribed );
        },
      });
    };

    const handleDetailEvent: () => Promise<void> = async (): Promise<void> => {
      await fetchApi({
        request: async (token) => {
          return new CertificaUTFEventEndpoint( token ).findOne( eventId );
        },
        onSuccess: (result: any) => {
            setEvent(result);
        },
      });
    };
  
    handleDetailEvent()
    handleParticipantIsSubscribed()
  }, [eventId]);

  if (isLoading) {
    return (
      <View style={{ flex: 1 }} className="flex items-center justify-center">
        <ActivityIndicator animating={isLoading} size="large" />
      </View>
    );
  }

  if (!event) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Evento não encontrado</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-neutral-700">
      <StatusBar style="light" />
      <BackStackScreenButton />
      <ScrollView>
        <Card event={event} />
        <Description event={event} />
      </ScrollView>

      <View>
        { isAdmin && <CheckInParticipant event={event} isCheckin={true} /> }
        { isAdmin && <CheckInParticipant event={event} isCheckin={false} /> }
        { !isAdmin && !isSubscribed && <SubscribeParticipant event={event} onPress={handleOnSubscribe} /> }
        { isSubscribed && !isAdmin && <RemoveParticipant event={event} onPress={handleOnRemoveSubscribe}></RemoveParticipant> }
      </View>
    </SafeAreaView>
  );
}