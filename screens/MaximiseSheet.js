import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

const MaximiseSheet = ({ route }) => {
  const { imageUrl } = route.params; // Retrieve the imageUrl passed as a parameter
  
  return (
    <View style={styles.container}>
      <Image 
        source={{ uri: imageUrl }} 
        style={styles.image} 
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000', // Optional: for better image contrast
  },
  image: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default MaximiseSheet;
