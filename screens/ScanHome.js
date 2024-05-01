import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { Camera } from 'expo-camera';

const ScanHome = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View style={styles.container}><Text>Requesting permissions...</Text></View>;
  }
  if (hasPermission === false) {
    return <View style={styles.container}><Text>No access to camera</Text></View>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>WELCOME TO NUM8ERS AI SYSTEM</Text>
      <Text style={styles.subText}>***Scan question and select method, NUM8ERS will solve your question***</Text>
      <Camera style={styles.camera} type={type}>
        {/* Camera view configured here */}
      </Camera>
      <Button title="Flip Camera" onPress={() => {
        setType(type === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back);
      }} />
    </View>
  );
};

export default ScanHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#313131',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
  },
  headerText: {
    marginTop: 20,
    fontSize: 20,
    color: 'white',
  },
  subText: {
    marginTop: 50,
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  camera: {
    width: '100%',
    height: 300, // Set a fixed height or use flex value if you want it to fill remaining space
    marginTop: 20,
  },
});
