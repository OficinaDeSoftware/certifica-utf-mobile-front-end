import { View, Text } from "react-native";

interface BadgeProps {
  participants: number;
}

export default function Badge({ participants }: BadgeProps) {
  return (
    <View className="flex-row items-center bg-white rounded-full px-4 py-2 shadow-md">
      <Text className="text-lg font-bold text-black">{participants}</Text>
      <Text className="text-lg font-bold text-black ml-2">participantes</Text>
    </View>
  );
}
