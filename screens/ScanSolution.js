import React from "react";
import { StyleSheet, Text, View } from "react-native";

const ScanSolution = ({ route }) => {
  const { solution } = route.params; // Get the solution from route parameters

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Solution</Text>
      <Text style={styles.solutionText}>{solution}</Text>
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
    alignSelf: 'center',
    textAlign: 'center',
  },
  solutionText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'left',
    marginTop: 20,
  },
});
