import { Event } from "@/types/EventType";
import { Feather, Fontisto } from "@expo/vector-icons";
import { Image, Text, View } from "react-native";

export default function ParticipantImage({ imageSrc }: { imageSrc: string }) {
  return (
    <Image
      className="w-10 h-10 rounded-full border-2 border-white object-cover"
      source={require('@/assets/images/event/detail/event-detail-background.jpg')}
    />
  )
}