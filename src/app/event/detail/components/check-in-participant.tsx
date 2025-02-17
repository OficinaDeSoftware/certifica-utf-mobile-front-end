import { Event } from "@/types/EventType";
import { StyledButton } from "@/src/components/styledbutton";
import { Text, View } from "react-native";
import { useCameraPermissions } from "expo-camera";
import { router } from "expo-router";

export default function CheckInParticipant({ event, isCheckin }: { event: Event, isCheckin: boolean }) {

  const [permission, requestPermission] = useCameraPermissions();

  async function readQRCode() {
    console.log('readQRCode: ' + isCheckin);
    if(permission?.granted) {
      router.push({
        pathname: '/scanner',
        params: {
          checkin: String(isCheckin),
          idEvent: event.id
         }, // Passa o status como parâmetro
      });
    } else {
      if((await requestPermission())?.granted) {
        router.push({
          pathname: '/scanner',
          params: {
            checkin: String(isCheckin),
            idEvent: event.id
          }, // Passa o status como parâmetro
        });
      }
    }
  }

  return (
    <View className="flex-row justify-center ">
      <View className="w-full p-5">
        <StyledButton onPress={() => readQRCode()}>
          <Text className="text-white text-base font-semibold">{isCheckin ? "Checkin" : "Checkout"}</Text>
        </StyledButton>
      </View>
    </View>
  )
}