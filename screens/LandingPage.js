import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');
const containerPadding = 20;
const imageHeight = width * 0.3; // Increase image height to 30% of screen width
const imageMarginTop = 30; // Increased margin between title and image

const LandingPage = ({ navigation }) => {
  const buttons = [
    { title: 'LEARNING WITH NUMBERS', navigateTo: 'Learning', imageSource: require('../assets/Images/path-to-learning.png') },
    { title: 'SCAN WITH NUMBERS AI TOOL', navigateTo: 'Scan', imageSource: require('../assets/Images/path-to-scan.png') },
    { title: 'FORMULAS SHEET', navigateTo: 'FormulaHome', imageSource: require('../assets/Images/path-to-formula.png') },
  ];

  return (
    <View style={styles.container}>
      {buttons.map((button, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => navigation.navigate(button.navigateTo)}
          style={[
            styles.button,
            index === 0 || index === buttons.length - 1
              ? styles.lightGreenButton
              : styles.blackButton,
          ]}
        >
          <Text
            style={[
              styles.text,
              index === 0 || index === buttons.length - 1
                ? styles.blackText
                : styles.whiteText,
            ]}
          >
            {button.title}
          </Text>
          <Image
            source={button.imageSource}
            style={styles.image}
            resizeMode="contain"
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: containerPadding,
    backgroundColor: 'white',
  

  },
  button: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: width - 2 * containerPadding,
    borderRadius: 10,
    padding: containerPadding,
    marginBottom: 20,
  },
  image: {
    height: imageHeight,
    width: '100%',
    marginTop: imageMarginTop,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    position: 'absolute',
    top: 10,
    width: '100%',
    textAlign: 'center',
  },
  lightGreenButton: {
    backgroundColor: '#D4E09B',
  },
  blackButton: {
    backgroundColor: '#313131',
  },
  blackText: {
    color: '#000',
  },
  whiteText: {
    color: '#FFF',
  },
});

export default LandingPage;
