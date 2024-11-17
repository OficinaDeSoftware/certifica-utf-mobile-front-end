import { View, Text, Pressable } from 'react-native'

interface Props{
    name: string;
    size: "text-lg" | "text-xl" | "text-2xl";
    lable: string;
    action: () => void;
}

export default function Section({name, size, lable, action}: Props) {
  return (
    <View className='w-full flex flex-row items-center justify-between px-4'>
      <Text className={`${size} font-semibold my-4 self-start`}>{name}</Text>

      <Pressable onPress={action}>
        <Text>{lable}</Text>
      </Pressable>
    </View>
  )
}