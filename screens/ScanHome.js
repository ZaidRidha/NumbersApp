import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { OPENAI_API_KEY } from "@env";
import OpenAI from "openai";

const ScanHome = () => {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();

  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");
  const cameraRef = useRef(null);

  const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
  });

  const takePicture = async () => {
    if (cameraRef.current) {
      const options = { base64: true };
      const photo = await cameraRef.current.takePictureAsync(options);
      let photoBase64 = photo.base64;

      let imageDataUrl = `data:image/jpeg;base64,${photoBase64}`;

      callOpenAIAPI(imageDataUrl);
    }
  };
  const callOpenAIAPI = async (imageDataUrl) => {
    try {
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: "What’s in this image?" },
              {
                type: "image_url",
                image_url: {
                  "url": imageDataUrl,
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
  if (!permission) {
    // Camera permissions are still loading.
    return (
      <View style={styles.container}>
        <Text>Loading permissions...</Text>
      </View>
    ); // Added a return statement to handle this case
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    console.log("not yet granted");
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>WELCOME TO NUM8ERS AI SYSTEM</Text>
      <Text style={styles.subText}>
        ***Scan question and select method, NUM8ERS will solve your question***
      </Text>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
      <Button title="Send" onPress={takePicture} />
      <Text>{response}</Text>
    </View>
  );
};

export default ScanHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#313131",
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
  },
  headerText: {
    marginTop: 20,
    fontSize: 20,
    color: "white",
  },
  subText: {
    marginTop: 50,
    color: "white",
    fontSize: 16,
    textAlign: "center",
    paddingHorizontal: 10,
    marginBottom: 50,
  },

  camera: {
    width: 400,
    height: 400,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
