import { Event } from "@/types/EventType";
import { StyledButton } from "@/src/components/styledbutton";
import { Text, View } from "react-native";
import { useCameraPermissions } from "expo-camera";
import { router } from "expo-router";

export default function CheckInParticipant({ event }: { event: Event }) {

  const [permission, requestPermission] = useCameraPermissions();

  async function readQRCode() {
    if(permission?.granted) {
      router.push('/scanner')
    } else {
      if((await requestPermission())?.granted) {
        router.push('/scanner')
      }
    }
  }

  return (
    <View className="flex-row justify-center ">
      <View className="w-full p-5">
        <StyledButton onPress={() => readQRCode()}>
          <Text className="text-white text-base font-semibold">Check-In Participante (Abrir Scanner)</Text>
        </StyledButton>
      </View>
    </View>
  )
}