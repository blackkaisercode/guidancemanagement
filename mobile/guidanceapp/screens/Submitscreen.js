import { useState } from "react";
import {
  View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Platform,
  ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from "@react-native-community/datetimepicker";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function SubmitScreen() {
  const navigation = useNavigation();
  const [description, setDescription] = useState("");
  const [urgencyLevel, setUrgencyLevel] = useState("");
  const [incidentType, setIncidentType] = useState("");
  const [incidentDate, setIncidentDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [location, setLocation] = useState('');
  const [attachment, setAttachment] = useState('');
  const [contactInfo, setContactInfo] = useState('');

  const maxChars = 100;

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || incidentDate;
    setShowDatePicker(Platform.OS === "ios");
    setIncidentDate(currentDate);
  };

  const handleSubmit = async () => {
    if (!incidentType || !location || !description || !urgencyLevel) {
      alert("Please complete all required fields.");
      return;
    }

    try {
      await addDoc(collection(db, "incidents"), {
        incidentType,
        location,
        incidentDate: incidentDate.toISOString(),
        description,
        urgencyLevel,
        attachment,
        contactInfo,
        timestamp: new Date(),
      });

      alert("Incident submitted successfully.");
      navigation.navigate("Home");
    } catch (error) {
      console.error("Error submitting incident:", error);
      alert("Failed to submit incident.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <Image
            source={require('../assets/shieldcheck.png')}
            style={styles.image}
          />

          <View style={styles.formBox}>
            <Text style={styles.label}>TYPE OF INCIDENT</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={incidentType}
                onValueChange={(itemValue) => setIncidentType(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="-- Choose Type of Incident --" value="" enabled={false} />
                <Picker.Item label="Theft" value="theft" />
                <Picker.Item label="Vandalism" value="vandalism" />
                <Picker.Item label="Fighting" value="fighting" />
                <Picker.Item label="Bullying" value="bullying" />
                <Picker.Item label="Disruptive Behavior" value="disruptive" />
              </Picker>
            </View>

            <Text style={styles.label}>LOCATION OF THE INCIDENT</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter place"
              value={location}
              onChangeText={setLocation}
            />

            <Text style={styles.label}>DATE OF THE INCIDENT</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.input}>
              <Text style={styles.dateText}>{incidentDate.toDateString()}</Text>
            </TouchableOpacity>

            {showDatePicker && (
              <DateTimePicker
                value={incidentDate}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
            )}

            <Text style={styles.label}>DETAILS OF THE INCIDENT</Text>
            <TextInput
              style={[styles.input, styles.multilineInput]}
              placeholder="Enter description"
              multiline
              numberOfLines={4}
              maxLength={maxChars}
              value={description}
              onChangeText={text => setDescription(text)}
            />
            <Text style={styles.counter}>{description.length} / {maxChars}</Text>

            <Text style={styles.label}>URGENCY LEVEL</Text>
            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={urgencyLevel}
                onValueChange={(itemValue) => setUrgencyLevel(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="-- Choose Urgency Level --" value="" enabled={false} />
                <Picker.Item label="Level 1" value="1" />
                <Picker.Item label="Level 2" value="2" />
                <Picker.Item label="Level 3" value="3" />
                <Picker.Item label="Level 4" value="4" />
                <Picker.Item label="Level 5" value="5" />
              </Picker>
            </View>

            <Text style={styles.label}>ATTACHMENT (OPTIONAL)</Text>
            <TextInput
              style={styles.input}
              placeholder="Attachment"
              value={attachment}
              onChangeText={setAttachment}
            />

            <Text style={styles.label}>WOULD YOU LIKE TO BE CONTACTED (OPTIONAL)</Text>
            <TextInput
              style={styles.input}
              placeholder="If yes, please enter your phone number here"
              value={contactInfo}
              onChangeText={setContactInfo}
            />
          </View>

          <View style={styles.buttonBox}>
            <TouchableOpacity style={styles.cancelbutton} onPress={() => navigation.navigate("Home")}>
              <Text style={styles.cancelText}>CANCEL</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.submitbutton} onPress={handleSubmit}>
              <Text style={styles.submitText}>SUBMIT</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#800000',
  },
  scrollContainer: {
    alignItems: 'center',
    paddingBottom: 50,
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginVertical: 10,
  },
  formBox: {
    width: '85%',
    backgroundColor: 'transparent',
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    color: '#ffffff',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: '#ffffff',
    fontSize: 16,
    color: '#000',
  },
  multilineInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  dateText: {
    fontSize: 16,
    color: '#000',
  },
  pickerWrapper: {
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  picker: {
    height: 55,
    width: '100%',
    color: '#000',
    fontSize: 16,
    paddingHorizontal: 10,
    backgroundColor: '#ffffff',
  },
  buttonBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '75%',
    paddingHorizontal: 20,
    backgroundColor: 'transparent',
  },
  cancelbutton: {
    backgroundColor: '#C40410',
    alignItems: "center",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  submitbutton: {
    backgroundColor: '#FFD54F',
    alignItems: "center",
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cancelText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  submitText: {
    color: "black",
    fontSize: 18,
    fontWeight: "bold",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  counter: {
    alignSelf: 'flex-end',
    marginTop: 5,
    color: '#ffffff',
    fontSize: 12,
  },
});
