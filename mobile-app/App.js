import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal
} from "react-native";
const App = () => {
  const [isOn, setIsOn] = useState(false);

  const toggleSwitch = () => {
    setIsOn(!isOn);
    // Add your logic for turning on/off here
  };

  const [sensorData, setSensorData] = useState([]);
  const dataUrl = "http://192.168.43.148:3001/api/v1/irrigation";
  useEffect(() => {
    getSensorDataList();
  }, [])

  const getSensorDataList = () => {
    fetch(dataUrl).then(res => {
      if (!res.ok) {
        throw new Error('Network response was not ok');
      }
      return res.json();
    }).then(data => {
      setSensorData(data)
    }).catch(err => {
      console.error('Error fetching data:', err);
    })
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <Text style={styles.txtMain}>Sensor Data {sensorData.length}</Text>
        {sensorData.map((item, index) => (
          <View key={index} style={styles.row}>
            <Text style={styles.label}>Temperature: <Text style={styles.value}>{item.temperature}</Text></Text>
            <Text style={styles.label}>Humidity: <Text style={styles.value}>{item.humidity}</Text></Text>
            <Text style={styles.label}>Moisture: <Text style={styles.value}>{item.moisture}</Text></Text>
          </View>
        ))}
        <TouchableOpacity onPress={toggleSwitch} style={[styles.button, isOn ? styles.buttonOn : styles.buttonOff]}>
          <Text style={styles.buttonText}>{isOn ? 'Turn Off' : 'Turn On'}</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  scrollView: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  txtMain: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    color: '#333',
  },
  row: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    elevation: 2,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#555',
  },
  value: {
    fontWeight: 'bold',
    color: '#333',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonOn: {
    backgroundColor: '#EF5350', // Red color for "Turn Off" state
  },
  buttonOff: {
    backgroundColor: '#4CAF50', // Green color for "Turn On" state
  },
});
