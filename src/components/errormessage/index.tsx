import {Text, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";

interface ErrorMessageProps {
    message : string
}

export function ErrorMessage( { message } : ErrorMessageProps ) {
    return (
        <View className="flex flex-row items-center gap-2">
            <Ionicons name="warning-outline" size={24} color="#f87171" />
            <Text className="text-red-400 flex-1 break-normal">{message}</Text>
        </View>
    )
}