import { View, Text, TouchableOpacity } from 'react-native'
import { router } from 'expo-router';
import React from 'react'

export default function Scanner() {
  return (
    <View className='flex-1 items-center justify-center'>
      <Text>Scanner</Text>

      <TouchableOpacity onPress={() => router.back()}>
        <Text>Go to Home</Text>
      </TouchableOpacity>
    </View>
  )
}