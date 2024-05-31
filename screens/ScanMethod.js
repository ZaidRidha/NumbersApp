import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity,Image } from "react-native";
import Checkbox from 'expo-checkbox';
import { OPENAI_API_KEY } from "@env";
import OpenAI from "openai";

const ScanMethod = ({ route, navigation }) => {

  const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
  });

  const { photo } = route.params; // Get the photo from route parameters

  const [response, setResponse] = useState(""); // State to store the API response
  const [selectedMethod, setSelectedMethod] = useState("Factoring"); // Set "Factoring" as the default selected method

  const methods = [
    "Factoring",
    "Quadratic Formula",
    "Completing the square",
    "Graphical Method",
    "Using computer algebra system (CAS)"
  ];

  

  const toggleMethod = (method) => {
    setSelectedMethod(method); // Always set the selected method, disallow unselecting
  };

  const scanPicture = async () => {
    if (photo) {
      let imageDataUrl = `data:image/jpeg;base64,${photo}`;
      await callOpenAIAPI(imageDataUrl);
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

      <TouchableOpacity style={styles.solutionButton} onPress={scanPicture}>
        <Text style={styles.actionButtonText}>Solution</Text>
      </TouchableOpacity>

      {response && <Text style={styles.response}>{response}</Text>}
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

  image: {
    width: 300,
    height: 300,
    resizeMode: 'contain',
    marginBottom: 20,
  },
});
