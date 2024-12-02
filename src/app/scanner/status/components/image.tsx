import { View, Text } from 'react-native'
import { Check, X } from 'lucide-react-native';
import React from 'react'

export default function Image({ status }: { status: boolean }) {
  return (
    <View className="w-20 h-20 mb-8 items-center justify-center">
      {status ? (
        <Check size={120} color="#4CAF50" strokeWidth={3} />
      ) : (
        <X size={120} color="#F44336" strokeWidth={3} />
      )}
    </View>
  )
}