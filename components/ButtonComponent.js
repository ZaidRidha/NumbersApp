import React from "react";
import { StyleSheet, Text, Image, TouchableOpacity, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

// Helper functions
const isTablet = () => {
  return Math.min(width, height) >= 600;
};

const scaleFontSize = (fontSize) => {
  const ratio = isTablet() ? 1.75 : 1;
  return fontSize * ratio;
};

// ButtonComponent with default buttonStyle
const ButtonComponent = ({
  title,
  navigateTo,
  imageSource,
  navigation,
  buttonStyle = {}, // Provide a default empty object
}) => {
  const customImageStyle = buttonStyle.image || styles.image;
  const textStyle = [
    styles.text,
    buttonStyle.text && buttonStyle.text, // Ensure buttonStyle.text exists before spreading
    { fontSize: scaleFontSize(18) },
    isTablet() ? styles.tabletText : {},
  ];

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(navigateTo)}
      style={[styles.button, buttonStyle.button && buttonStyle.button]} // Ensure buttonStyle.button exists before spreading
    >
      <Text style={textStyle}>{title}</Text>
      <Image source={imageSource} style={customImageStyle} resizeMode="contain" />
    </TouchableOpacity>
  );
};

// Styles
const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "flex-start",
    width: width - 40,
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    height: width * 0.3 + 30 + 40,
    position: "relative",
  },
  image: {
    width: "95%",
    height: "95%",
    position: "absolute",
    right: 0,
    bottom: 0,
  },
  text: {
    fontWeight: "bold",
    position: "absolute",
    top: 10,
    left: 10,
    width: "100%",
    textAlign: "left",
  },
  tabletText: {
    padding: 5,
    paddingLeft: 10,
  },
});

export default ButtonComponent;
