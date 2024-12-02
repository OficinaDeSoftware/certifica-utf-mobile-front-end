import { View, Text } from 'react-native'
import React from 'react'

export default function Info({ status }: { status: boolean }) {
  return (
    <View className="items-center">
      {status ? (
        <>
          <Text className="text-[#2e5244] text-5xl font-medium text-center mb-8">
            Check-in feito com sucesso!
          </Text>
          <Text className="text-[#2e5244] opacity-50 font-bold text-center w-48">
            Clique em continue para um novo check-in
          </Text>
        </>
      ) : (
        <>
          <Text className="text-[#FF0000] text-4xl font-medium text-center mb-8">
            Erro! Código QR não corresponde a nenhum participante
          </Text>
          <Text className="text-[#FF0000] opacity-50 font-bold text-center w-44">
            Clique em voltar para ler outro QR-Code
          </Text>
        </>
      )}
    </View>
  )
}