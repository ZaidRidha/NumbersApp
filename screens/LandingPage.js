import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  PixelRatio,
} from "react-native";

const { width, height } = Dimensions.get("window");
const containerPadding = 20;
const imageHeight = width * 0.3;
const imageMarginTop = 30;

// Helper functions to determine if the device is a tablet and to scale font size
const isTablet = () => {
  // Example check for tablet: screen width over 600dp. Adjust as needed.
  return Math.min(width, height) >= 600;
};

const scaleFontSize = (fontSize) => {
  // Increase font size for tablets
  const ratio = isTablet() ? 1.75 : 1; // Increase font size by 50% on tablets
  return fontSize * ratio;
};

// Common Button Component
const ButtonComponent = ({
  title,
  navigateTo,
  imageSource,
  navigation,
  buttonStyle,
}) => {
  const customImageStyle = buttonStyle.image || styles.image;
  const textStyle = [
    styles.text,
    buttonStyle.text,
    { fontSize: scaleFontSize(18) },
    isTablet() ? styles.tabletText : {}, // Apply tablet-specific styles conditionally
  ];

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(navigateTo)}
      style={[styles.button, buttonStyle.button]}
    >
      <Text style={textStyle}>{title}</Text>
      <Image
        source={imageSource}
        style={customImageStyle}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
};

const LandingPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Learning Button */}
      <ButtonComponent
        title="LEARNING WITH NUMBERS"
        navigateTo="NumbersHome"
        imageSource={require("../assets/Images/path-to-learning-3.png")}
        navigation={navigation}
        buttonStyle={styles.learningButton}
      />
      {/* AI Button */}
      <ButtonComponent
        title="SCAN WITH NUMBERS AI TOOL"
        navigateTo="ScanHome"
        imageSource={require("../assets/Images/path-to-scan-3.png")}
        navigation={navigation}
        buttonStyle={styles.aiButton}
      />
      {/* Formula Button */}
      <ButtonComponent
        title="FORMULAS SHEET"
        navigateTo="FormulaHome"
        imageSource={require("../assets/Images/path-to-formula-4.png")}
        navigation={navigation}
        buttonStyle={styles.formulaButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: containerPadding,
    backgroundColor: "white",
  },
  button: {
    justifyContent: "center",
    alignItems: "flex-start",
    width: width - 2 * containerPadding,
    borderRadius: 10,
    padding: containerPadding,
    marginBottom: 20,
    height: imageHeight + imageMarginTop + containerPadding * 2,
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
    right: 0,
    bottom: 0,
  },
  text: {
    fontWeight: "bold",
    position: "absolute",
    top: 10,
    left: 10,
    width: "70%",
    textAlign: "left",
  },

  tabletText: {
    padding: 5,
    paddingLeft: 10,
  },
  learningButton: {
    button: { backgroundColor: "#D4E09B" },
    text: { color: "#000" },
  },
  aiButton: {
    button: { backgroundColor: "#313131" },
    text: { color: "#FFF" },
  },
  formulaButton: {
    button: { backgroundColor: "#D4E09B" },
    text: { color: "#000" },
    image: {
      width: "120%",
      height: "120%",
      position: "absolute",
      right: 0,
      bottom: 0,
    },
  },
});

export default LandingPage;
