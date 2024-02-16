import React from 'react';
import { View, Image, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';

// Make sure to pass the navigation prop to CustomHeader
const CustomHeader = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.navigate('LandingPage')}>
        <Image
          source={require('../assets/Images/headerlogo.png')} // Replace with your logo image path
          style={styles.logo}
          resizeMode="contain"
        />
      </TouchableOpacity>
      {/* Add other header elements here if needed */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    height: 60, // Adjust the height as needed
    paddingHorizontal: 20, // Add some padding if needed
    flexDirection: 'row', // Align children in a row
    alignItems: 'center', // Center items vertically
    width: '100%', // Header should span the full width
    backgroundColor: '#fff', // Adjust the background color as needed
  },
  logo: {
    height: 100,
    width: 100,
    marginLeft: 20, // This line pushes the logo to the right
  },
});

export default CustomHeader;
