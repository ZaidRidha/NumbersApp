import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert, ActivityIndicator } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import { OPENAI_API_KEY } from "@env";
import OpenAI from "openai";
import Ionicons from '@expo/vector-icons/Ionicons';
import debounce from 'lodash.debounce'; // Import lodash debounce

const ScanHome = ({ navigation }) => {
  const [facing, setFacing] = useState("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [response, setResponse] = useState("");
  const [storedPhoto, setStoredPhoto] = useState(null);
  const [loading, setLoading] = useState(false); // Loading state
  const cameraRef = useRef(null);

  const openai = new OpenAI({
    apiKey: OPENAI_API_KEY,
  });

  const takePicture = async () => {
    if (storedPhoto) {
      setStoredPhoto(null);
    } else if (cameraRef.current) {
      const options = { base64: true };
      const photo = await cameraRef.current.takePictureAsync(options);
      setStoredPhoto(photo.base64);
    }
  };

  // Debounce the takePicture function
  const debouncedTakePicture = debounce(takePicture, 1000);

  const scanPicture = async () => {
    if (storedPhoto) {
      setLoading(true); // Start loading
      let imageDataUrl = `data:image/jpeg;base64,${storedPhoto}`;
      await callOpenAIAPI(imageDataUrl);
      setLoading(false); // Stop loading
    } else {
      Alert.alert("No photo to scan", "Please take a photo first.");
    }
  };

  const callOpenAIAPI = async (imageDataUrl) => {
    try {
      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: "What methods can I use to solve this problem?, Simply give me the methods I can use to solve the problem, each method on a new line, nothing else. Don't write anything other than the methods. Each method on a new line. Maximum 5 methods." },
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
      navigation.navigate("ScanMethod", { photo: storedPhoto, methodResponse: completion.choices[0].message.content });
    } catch (error) {
      console.error("Error calling OpenAI API", error);
      setResponse(`Error: ${error.message}`);
    }
  };

  if (!permission) {
    return (
      <View style={styles.container}>
        <Text>Loading permissions...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <TouchableOpacity
          onPress={requestPermission}
          style={styles.grantPermissionButton}
        >
          <Text style={styles.grantPermissionText}>Grant Permission</Text>
        </TouchableOpacity>
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
      
      {storedPhoto ? (
        <View>
        <Image
          source={{ uri: `data:image/jpeg;base64,${storedPhoto}` }}
          style={styles.camera}
        />
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => setStoredPhoto(null)}
        >
          <Ionicons name="close-circle-outline" size={32} color="white" />
        </TouchableOpacity>
      </View>
      ) : (
        <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
            <TouchableOpacity
              style={styles.flipButton}
              onPress={toggleCameraFacing}
            >
              <Ionicons name="camera-reverse-outline" size={32} color="white" />
            </TouchableOpacity>
        </CameraView>
      )}

      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={debouncedTakePicture}>
          <Text style={styles.actionButtonText}>Retake</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={scanPicture} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#FFFFFF" />
          ) : (
            <Text style={styles.actionButtonText}>Scan</Text>
          )}
        </TouchableOpacity>
      </View>
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

  flipButton: {
    position: "absolute",
    top: 25,
    right: 25,
    zIndex: 1,
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  preview: {
    width: 300,
    height: 300,
    marginTop: 20,
  },
  actionButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "80%",
    marginTop: 20,
  },
  actionButton: {
    flex: 1,
    backgroundColor: "#538A0E",
    padding: 12,
    marginHorizontal: 10,
    alignItems: "center",
    borderRadius: 10,
  },
  actionButtonText: {
    color: "white",
    fontSize: 16,
  },
  grantPermissionButton: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
  },
  grantPermissionText: {
    color: "white",
  },

  closeButton: {
    position: "absolute",
    top: 10,
    left: 10,
    zIndex: 1,
  },
});
