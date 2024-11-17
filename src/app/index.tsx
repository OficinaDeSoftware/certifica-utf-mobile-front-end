import { Text, View, ScrollView, SafeAreaView } from 'react-native';
import Header from '@/src/components/header';
import Constants  from 'expo-constants';
import Banner from '../components/banner';
import Search from '../components/serch';
import Section from '../components/section';
import TrendingFoods from '../components/trending';
import Restaurants from '../components/restaurants';
import RestaurantVerticalList from '../components/list';

const statusBarHeight = Constants.statusBarHeight

export default function Index() {
  return (
    <SafeAreaView
      style={{flex: 1}}
    >
      <ScrollView
        className='bg-slate-200'
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{marginTop: statusBarHeight}}
          className='w-full px-4'
        >
          <Header/>

          <Banner></Banner>

          <Search></Search>
        </View>

        <Section
            name="Comidas em alta"
            lable="Veja mais"
            action={() => console.log("Clicou no veja mais")}
            size="text-2xl"
          />

        <TrendingFoods/>

        <Section
            name="Comidas novas"
            lable="Veja mais"
            action={() => console.log("Clicou no comidas novas")}
            size="text-2xl"
          />

        <TrendingFoods/>

        <Section
            name="Famosos no DevFood"
            lable="Veja todos"
            action={() => console.log("Clicou no veja todos")}
            size="text-xl"
          />

        <Restaurants/>

        <Section
            name="Restaurantes"
            lable="Veja todos"
            action={() => console.log("Clicou no restaurantes")}
            size="text-xl"
          />

        <RestaurantVerticalList/>
      </ScrollView>
    </SafeAreaView>
  );
}