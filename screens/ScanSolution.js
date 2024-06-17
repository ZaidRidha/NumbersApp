import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";

const ScanSolution = ({ route, navigation }) => {
  const { solution } = route.params; // Get the solution from route parameters

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Solution</Text>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.solutionText}>{solution}</Text>
        <TouchableOpacity
          style={styles.nextButton}
          onPress={() => navigation.replace("ScanHome")}
        >
          <Text style={styles.actionButtonText}>Solution</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default ScanSolution;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#313131",
    justifyContent: "flex-start",
    padding: 20,
  },
  headerText: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 20,
    color: "white",
    alignSelf: "center",
    textAlign: "center",
  },
  scrollViewContent: {
    paddingBottom: 20,
  },

  nextButton: {
    backgroundColor: "#538A0E",
    padding: 10,
    width: 200,  // Reducing the width to make the button less wide
    alignSelf: 'center',  // This will center the button in the view
    marginTop: 50,  // Reducing the margin to make it a bit higher
    alignItems: "center",
    borderRadius: 10,
  },
  solutionText: {
    color: "white",
    fontSize: 16,
    textAlign: "left",
    marginTop: 20,
  },

  actionButtonText: {
    color: 'white',  // Setting the text color to white
    fontSize: 20,
  },
});
