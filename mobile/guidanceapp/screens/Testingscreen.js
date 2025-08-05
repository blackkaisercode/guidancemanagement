import { View, Text, StyleSheet, TouchableOpacity, Platform, Button } from "react-native";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function TestingScreen() {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [output, setOutput] = useState("");

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(Platform.OS === "ios"); // keep picker open on iOS
    setDate(currentDate);
  };

  const handleShowOutput = () => {
    setOutput(`Selected Date: ${date.toDateString()}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Date of the Incident</Text>

      <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.dateInput}>
        <Text style={styles.dateText}>{date.toDateString()}</Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      <View style={styles.buttonContainer}>
        <Button title="Show Selected Date" onPress={handleShowOutput} />
      </View>

      {output !== "" && <Text style={styles.output}>{output}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  dateInput: {
    padding: 12,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
  },
  dateText: {
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 20,
  },
  output: {
    marginTop: 20,
    fontSize: 16,
    textAlign: "center",
    fontStyle: "italic",
  },
});
