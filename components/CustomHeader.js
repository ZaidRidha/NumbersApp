import React from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Assuming isTablet function is similar to the previous example
const isTablet = () => {
  const { width, height } = Dimensions.get("window");
  return Math.min(width, height) >= 600;
};

const CustomHeader = ({ navigation }) => {
  const logoStyle = isTablet() ? styles.logoTablet : styles.logo;

  return (
    <SafeAreaView style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.navigate("LandingPage")}>
        <Image
          source={require("../assets/Images/headerlogo.png")} // Replace with your logo image path
          style={logoStyle}
          resizeMode="contain"
        />
      </TouchableOpacity>
      {/* Add other header elements here if needed */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {

    height: 100, // Adjust the height as needed

    flexDirection: "row", // Align children in a row
    alignItems: "center", // Center items vertically
    width: "100%", // Header should span the full width
    backgroundColor: "#fff", // Adjust the background color as needed
  },
  logo: {
    height: 100,
    width: 100,
    marginLeft: 20, // This line pushes the logo to the right
  },
  logoTablet: {
    height: 150, // Larger size for tablet
    width: 150, // Larger size for tablet
    marginLeft: 20,
  },
});

export default CustomHeader;
