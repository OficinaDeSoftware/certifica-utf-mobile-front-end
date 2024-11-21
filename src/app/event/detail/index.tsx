import { View, Text, TouchableOpacity } from 'react-native'
import { router } from 'expo-router';
import React from 'react'
import { useCameraPermissions } from "expo-camera"

import Button from '@/src/components/button'

export default function EventDetail() {
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
    <View className='flex-1 h-full'>
      <View
        style={{height:'92%'}}
        className='items-center justify-center h-5/6 bg-slate-100'>
        <Text>EventDetail</Text>

        <TouchableOpacity onPress={() => router.replace('/')}>
          <Text>Go to Home</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{height:'8%'}}
        className='items-center justify-center h-36 bg-white'>
        <Button action={readQRCode}/>
      </View>
    </View>
  )
}