import { router } from 'expo-router';
import { Text, View } from 'react-native';

import { useSession } from '@/src/hooks/auth';

export default function SignIn() {
  const { signIn } = useSession();
  return (
    <View className='flex-1 items-center justify-center'>
      <Text
        onPress={() => {
          signIn();
          // Navigate after signing in. You may want to tweak this to ensure sign-in is
          // successful before navigating.
          router.replace('/event/detail');
        }}>
        Sign In
      </Text>
    </View>
  );
}