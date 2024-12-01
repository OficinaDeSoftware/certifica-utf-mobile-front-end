import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';

import BackStackScreenButton from '@/src/components/backstackscreenbutton';

import { Event } from '@/types/EventType';
import { useLocalSearchParams } from 'expo-router';
import Card from './components/card';
import Description from './components/description';
import SubscribeParticipant from './components/subscribe-participant';
import CheckInParticipant from './components/check-in-participant';

async function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

async function fetchEventJSONServer(eventId: string): Promise<Event | null> {

  await delay(1000);

  const response = await fetch(`${process.env.EXPO_PUBLIC_JSON_SERVER_API_URL}/events/${eventId}`);
  const event = await response.json();

  return event

}

async function fetchEvent(eventId: string): Promise<Event | null> {
  try {
    const event = await fetchEventJSONServer(eventId);

    return event;
  } catch (error) {
    console.log(error)
    return null
  }
}

export default function EventDetails() {

  const { id: eventId }: { id: string } = useLocalSearchParams();
  const [event, setEvent] = useState<Event | null>();
  const [loading, setLoading] = useState(false);
  const [admin, setAdmin] = useState(true);

  useEffect(() => {
    async function fetchSetEvent() {
      setLoading(true);
      const eventResponse = await fetchEvent(eventId)

      if(eventResponse) {
        setEvent(eventResponse);
      }
      setLoading(false);
    }
    fetchSetEvent();
  }, [eventId]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text>Carregando</Text>
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
        {admin && <CheckInParticipant event={event} />}
        {!admin && <SubscribeParticipant event={event} />}
      </View>
    </SafeAreaView>
  );
}