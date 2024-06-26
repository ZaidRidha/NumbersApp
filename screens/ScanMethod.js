import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import Checkbox from 'expo-checkbox';
import { OPENAI_API_KEY } from "@env";
import OpenAI from "openai";

const ScanMethod = ({ route, navigation }) => {
  const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
  });

  const { photo, methodResponse } = route.params; // Get the photo and response from route parameters

  const [response, setResponse] = useState(""); // State to store the API response
  const [selectedMethod, setSelectedMethod] = useState(""); // State to store the selected method
  const [loading, setLoading] = useState(false); // Loading state

  // Parse the methodResponse into an array of methods
  const methods = methodResponse.split('\n').filter(method => method.trim() !== "");

  const toggleMethod = (method) => {
    setSelectedMethod(method); // Always set the selected method, disallow unselecting
  };

  const scanPicture = async () => {
    if (photo) {
      setLoading(true); // Start loading
      let imageDataUrl = `data:image/jpeg;base64,${photo}`;
      await callOpenAIAPI(imageDataUrl);
      setLoading(false); // Stop loading
    } else {
      setResponse("No photo to scan. Please take a photo first.");
    }
  };

  const callOpenAIAPI = async (imageDataUrl) => {
    try {
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: `Take a look at this Maths question, can you please try and solve it using ${selectedMethod}?` },
              {
                type: "image_url",
                image_url: {
                  url: imageDataUrl,
                },
              },
            ],
          },
        ],
        max_tokens: 500,
        model: "gpt-4o",
      });
  
      setResponse(completion.choices[0].message.content);
      navigation.navigate("ScanSolution", { solution: completion.choices[0].message.content });
    } catch (error) {
      console.error("Error calling OpenAI API", error);
      setResponse(`Error: ${error.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Select a Method</Text>
      {methods.map((method, index) => (
        <TouchableOpacity
          key={index}
          style={styles.checkboxContainer}
          onPress={() => toggleMethod(method)}
          activeOpacity={0.6}  // Controls the opacity of the button when pressed
        >
          <Checkbox
            style={styles.checkbox}
            value={selectedMethod === method}
            onValueChange={() => toggleMethod(method)}
          />
          <Text style={styles.checkboxLabel}>{method}</Text>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.solutionButton} onPress={scanPicture} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="small" color="#FFFFFF" />
        ) : (
          <Text style={styles.actionButtonText}>Solution</Text>
        )}
      </TouchableOpacity>

    </View>
  );
};

export default ScanMethod;

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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  checkbox: {
    marginRight: 8,
  },
  checkboxLabel: {
    color: 'white',
    fontSize: 20,
    flexWrap: 'wrap',  // Ensures the text wraps within the available space
    flex: 1,  // Ensures the text takes the remaining space in the row
  },
  solutionButton: {
    backgroundColor: "#538A0E",
    padding: 10,
    width: 200,  // Reducing the width to make the button less wide
    alignSelf: 'center',  // This will center the button in the view
    marginTop: 50,  // Reducing the margin to make it a bit higher
    alignItems: "center",
    borderRadius: 10,
  },
  actionButtonText: {
    color: 'white',  // Setting the text color to white
    fontSize: 20,
  },
  response: {
    marginTop: 20,
    color: "white",
    fontSize: 16,
    textAlign: "center",
    flexWrap: 'wrap',  // Ensures the text wraps within the available space
  },
});
