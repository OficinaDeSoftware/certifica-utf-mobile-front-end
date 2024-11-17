import { View, Text } from 'react-native'
import { useState, useEffect } from 'react'
import RestaurantItem from './item';

export interface RestaurantsProps{
    id: string;
    name: string;
    image: string;
}

export default function RestaurantVerticalList() {
    const [restaurants, setRestaurants] = useState<RestaurantsProps[]>([])
  
    useEffect(() => {
        async function getRestaurants() {
        const response = await fetch("http://192.168.3.4:3000/restaurants")
        const data = await response.json()

        setRestaurants(data)
    }

    getRestaurants()
    }, [])
  return (
    <View style={{
        paddingHorizontal: 16,
        flex: 1,
        width: '100%',
        height: '100%',
        marginBottom: 44,
        gap: 16,
      }}>
      {restaurants.map(item => (
        <RestaurantItem item={item} key={item.id}/>
      ))}
    </View>
  )
}