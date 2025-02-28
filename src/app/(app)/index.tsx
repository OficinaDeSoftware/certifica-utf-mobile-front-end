import { Text, View, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import React from 'react'

import { useSession } from '../../hooks/auth';

export default function App() {
  const { signOut } = useSession();

  return (
    <View className='flex-1 items-center justify-center'>
      <Text
        onPress={() => {
          // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
          signOut();
        }}>
        Sign Out
      </Text>
    </View>
  );
}