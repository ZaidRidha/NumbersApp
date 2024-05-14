import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";
import { CameraView, useCameraPermissions } from 'expo-camera';

const ScanHome = () => {

  const [facing, setFacing] = useState('back');
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    // Camera permissions are still loading.
    return <View style={styles.container}>
      <Text>Loading permissions...</Text>
    </View>; // Added a return statement to handle this case
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    console.log("not yet granted")
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing(current => (current === 'back' ? 'front' : 'back'));
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>WELCOME TO NUM8ERS AI SYSTEM</Text>
      <Text style={styles.subText}>
        ***Scan question and select method, NUM8ERS will solve your question***
      </Text>
      <CameraView style={styles.camera} facing={facing}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
            <Text style={styles.text}>Flip Camera</Text>
          </TouchableOpacity>
        </View>
      </CameraView>
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
  },


  camera: {
    width: 400,
    height: 400,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
