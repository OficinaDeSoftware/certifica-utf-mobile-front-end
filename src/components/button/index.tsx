import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'

interface Props{
    action: () => void;
}

export default function Button({action}: Props) {
  return (
    <View>
        <TouchableOpacity
        className='bg-purple-900 rounded-full'
        onPress={action}>
        <Text className='text-white px-4 py-2'>Fazer Check-in</Text>
        </TouchableOpacity>
    </View>
  )
}