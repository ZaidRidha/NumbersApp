import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
// Import your screen components and any additional components for the header
import LandingPage from "./screens/LandingPage.js";
import FormulaHome from "./screens/FormulaHome.js";
// Import a custom header component, or define it here
import CustomHeader from "./components/CustomHeader.js";
import NumbersHome from "./screens/NumbersHome.js";
import ApCurriculum from "./screens/ApCurriculum.js";
import MaximiseSheet from "./screens/MaximiseSheet.js";
import ScanHome from "./screens/ScanHome.js";
import ScanMethod from "./screens/ScanMethod.js";
import ScanSolution from "./screens/ScanSolution.js";

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LandingPage">
        <Stack.Screen
          name="LandingPage"
          component={LandingPage}
          options={({ navigation }) => ({
            // Use a function to get access to navigation
            header: () => <CustomHeader navigation={navigation} />, // Pass navigation prop to CustomHeader
            cardStyle: { backgroundColor: "white" },
          })}
        />
        <Stack.Screen
          name="FormulaHome"
          component={FormulaHome}
          options={({ navigation }) => ({
            // Use a function to get access to navigation
            header: () => <CustomHeader navigation={navigation} />, // Pass navigation prop to CustomHeader
            cardStyle: { backgroundColor: "white" },
          })}
        />
        <Stack.Screen
          name="ScanHome"
          component={ScanHome}
          options={({ navigation }) => ({
            // Use a function to get access to navigation
            header: () => <CustomHeader navigation={navigation} />, // Pass navigation prop to CustomHeader
            cardStyle: { backgroundColor: "white" },
          })}
        />

        <Stack.Screen
          name="ScanMethod"
          component={ScanMethod}
          options={({ navigation }) => ({
            // Use a function to get access to navigation
            header: () => <CustomHeader navigation={navigation} />, // Pass navigation prop to CustomHeader
            cardStyle: { backgroundColor: "white" },
          })}
        />

        <Stack.Screen
          name="ScanSolution"
          component={ScanSolution}
          options={({ navigation }) => ({
            // Use a function to get access to navigation
            header: () => <CustomHeader navigation={navigation} />, // Pass navigation prop to CustomHeader
            cardStyle: { backgroundColor: "white" },
          })}
        />

        <Stack.Screen
          name="NumbersHome"
          component={NumbersHome}
          options={({ navigation }) => ({
            header: () => <CustomHeader navigation={navigation} />,
            cardStyle: { backgroundColor: "white" },
          })}
        />

        <Stack.Screen
          name="ApCurriculum"
          component={ApCurriculum}
          options={({ navigation }) => ({
            header: () => <CustomHeader navigation={navigation} />,
            cardStyle: { backgroundColor: "white" },
          })}
        />

        <Stack.Screen
          name="MaximiseSheet"
          component={MaximiseSheet}
          options={{
            headerBackTitle: " ", // This hides the back button text but keeps the arrow
            title: "",
            headerStyle: {
              backgroundColor: "#000", // Set the header background color to black
              shadowOpacity: 0, // Removes shadow on iOS
              elevation: 0, // Removes shadow on Android
              borderBottomWidth: 0, // Removes bottom border line on iOS
            },
            headerTintColor: "#fff", // Optional: Change the header text and icons to white for contrast
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
