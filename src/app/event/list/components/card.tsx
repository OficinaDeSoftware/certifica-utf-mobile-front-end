import { Event, EventBasic } from "@/types/EventType";
import { ImageBackground, View, TouchableOpacity, Text } from "react-native";
import Badge from "./badge";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import ParticipantImage from "../../detail/components/participant-image";

interface CardProps {
  event: EventBasic;
}

export default function Card(props: CardProps) {
  const { event } = props;

  return (
    <TouchableOpacity
      onPress={() =>
        router.push({
          pathname: "/event/detail/[id]",
          params: {
            id: event.idEvent,
          },
        })
      }
    >
      <View className="bg-white rounded-lg overflow-hidden w-full h-[225px] my-2 ">
        <ImageBackground
          source={{ uri: event.backgroundUrl }}
          style={{ flex: 1, padding: 12 }}
          className="w-full h-full flex flex-col justify-between"
        >
          <View className="flex flex-row justify-between">
            <Badge participants={event.participantsCount} />
            <TouchableOpacity
              className="bg-white rounded-full p-2 ml-4 justify-center items-center"
              style={{ padding: 10 }}
            >
              <Ionicons name="heart-outline" size={24} color="#4b5563" />
            </TouchableOpacity>
          </View>

          <View className="flex flex-col p-3 bg-white rounded-2xl border-black gap-1">
            <Text className="text-lg font-bold text-black">{event.name}</Text>
            <View className="flex flex-row justify-between items-center">
              <View className="flex flex-row gap-2 items-center">
                <ParticipantImage imageSrc={""} />
                <Text className="text-black font-semibold text-lg">
                  Wonderwood
                </Text>
              </View>
              <View>
                <Text className="text-gray-600">
                  {event.startDate}
                </Text>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    </TouchableOpacity>
  );
}
