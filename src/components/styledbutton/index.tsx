import {ActivityIndicator, Text, TouchableOpacity} from "react-native";

interface StyledButtonProps {
    isLoading?: boolean,
    onPress: () => void;
    children: any;
    color?: string;
}

export function StyledButton( { isLoading, onPress, children, color }: StyledButtonProps ) {
    return (
        <TouchableOpacity className={`${ color ?? "bg-purple-500" } rounded-full flex justify-center items-center h-14`} onPress={onPress} >
            { !isLoading && <Text className="text-white">{children}</Text>}
            { isLoading && <ActivityIndicator color="white" size="large" />}
        </TouchableOpacity>
    )
}