import { Text, View, SafeAreaView } from 'react-native';

export default function Index() {
  return (
    <SafeAreaView
      style={{flex: 1}}
    >
      <View
        className='bg-slate-200  justify-center items-center h-full w-full'
      >
        <Text>Prorjeto Certifica UTFPR</Text>
      </View>
    </SafeAreaView>
  );
}