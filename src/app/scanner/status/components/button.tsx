import { TouchableOpacity, Text } from 'react-native'
import React from 'react'
import { router } from 'expo-router';

export default function Button({ status }: { status: boolean }) {

    if (status) {
        return (
            <TouchableOpacity 
                onPress={() => router.navigate('/event/list')}
                className="bg-[#4CAF50] py-4 rounded-full items-center w-60"
            >
                <Text className="text-white text-2xl">
                    CONTINUE
                </Text>
            </TouchableOpacity>
        )
    } else {
        return (
            <TouchableOpacity 
                onPress={() => router.back()}
                className="bg-[#FF0000] py-4 rounded-full items-center w-60"
            >
                <Text className="text-white text-2xl">
                    VOLTAR
                </Text>
            </TouchableOpacity>
        )
    }
}