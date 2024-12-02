import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

interface LoadingProps {
    isVisible: boolean; 
  }

  const Loading: React.FC<LoadingProps> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#4CAF50" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
});

export default Loading;