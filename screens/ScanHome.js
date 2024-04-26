import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const ScanHome = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>WELCOME TO NUM8ERS AI SYSTEM</Text>
      <Text style={styles.subText}>***Scan question and select method, NUM8ERS will solve your question***</Text>
    </View>
  );
};

export default ScanHome;

const styles = StyleSheet.create({
  container: {
    flex: 1, // Take up all available space
    backgroundColor: '#313131', // Dark grey background
    justifyContent: 'flex-start', // Align children at the start vertically
    alignItems: 'center', // Align children at the center horizontally
    padding: 20, // Add padding around the container to ensure content does not touch the edges
  },
  headerText: {
    marginTop: 20, // Add space at the top
    fontSize: 20, // Text size
    color: 'white', // Text color
  },
  subText: {
    marginTop: 50, // Space between the header and sub text
    color: 'white', // Text color
    fontSize: 16, // Smaller text size for sub text
    textAlign: 'center', // Center-align text
    paddingHorizontal: 10, // Horizontal padding to ensure text does not touch the sides
  },
});