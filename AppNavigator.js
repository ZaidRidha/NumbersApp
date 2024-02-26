import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
// Import your screen components and any additional components for the header
import LandingPage from "./screens/LandingPage.js";
import FormulaHome from "./screens/FormulaHome.js";
// Import a custom header component, or define it here
import CustomHeader from "./components/CustomHeader.js";
import NumbersHome from "./screens/NumbersHome.js";

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
          name="NumbersHome"
          component={NumbersHome}
          options={({ navigation }) => ({
            header: () => <CustomHeader navigation={navigation} />,
            cardStyle: { backgroundColor: "white" },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;
