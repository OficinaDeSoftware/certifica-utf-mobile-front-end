import { Event } from "@/types/EventType";
import { Feather, Fontisto } from "@expo/vector-icons";
import { Image, Text, View } from "react-native";
import ParticipantImage from "./participant-image";

export default function Card({ event }: { event: Event }) {
  return (
  <View className="h-[300px] relative">
    <Image
      className="w-full h-full"
      source={require('@/assets/images/event/detail/event-detail-background.jpg')}
    />
    <View className="z-10 m-5 p-5 bottom-[-50] left-0 right-0 absolute bg-neutral-700 rounded-3xl shadow-md shadow-gray-400">
      <View className='pb-4'>
        <Text className="text-2xl font-bold text-white mb-1">{event.name}</Text>
      </View>
      <View className="flex-row items-center pb-4">
      <Feather name="map-pin" size={24} color={'#fff'} className='pr-4' />
        <Text className='text-white'>Local: {event.location.description}</Text>
      </View>
      <View className="flex-row items-center pb-4">
        <Fontisto name="date" size={24} color={'#fff'} className='pr-4' />
        <Text className="text-white">
          De {new Date(event.initialDate).toLocaleDateString('pt-BR')} a {new Date(event.finalDate).toLocaleDateString('pt-BR')}
        </Text>
      </View>
      
      <View className="flex-row items-center  pt-2">
        { /* Não descobri como fazer o overlapping nessa desgraça */ }
        <View className="flex-row -space-x-3 pr-4">
          <ParticipantImage imageSrc={''} />
        </View>
        <Text className="text-white text-base">{event.participants} Participantes</Text>
      </View>
    </View>
  </View>
  )
}