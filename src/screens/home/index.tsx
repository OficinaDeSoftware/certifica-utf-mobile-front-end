import { View, Text, StyleSheet  } from 'react-native'
import React from 'react'

interface ScreenProps {
    navigation: any;
    route: any;
}

function HomeScreen({}: ScreenProps) {
    return (
        <View style={styles.container}>
          <Text style={styles.text}>Home!</Text>
        </View>
    );
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#f8f8f8', // Fundo claro
    },
    text: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#333', // Cor do texto mais escura
    },
});