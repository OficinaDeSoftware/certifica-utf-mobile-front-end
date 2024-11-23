import {Text, View} from "react-native";
import Entypo from '@expo/vector-icons/Entypo';

interface ErrorMessageProps {
    message : string
}

export function ErrorMessage( { message } : ErrorMessageProps ) {
    return (
        <View className="flex flex-row items-center gap-2">
            <Entypo name="warning" size={24} color="#f87171" />
            <Text className="text-red-400 flex-1 break-normal">{message}</Text>
        </View>
    )
}