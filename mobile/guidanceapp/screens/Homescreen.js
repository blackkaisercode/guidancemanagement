import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from 'react-native';
const { width } = Dimensions.get('window');


export default function HomeScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {/* Square box with centered content */}
      <View style={styles.squareBox}>
        <Text style={styles.title}>BOSES GUINAYANG</Text>

        <Image
          source={require('../assets/shieldcheck.png')} // adjust path if needed
          style={styles.image}
        />

        <Text style={styles.subtitle}>Your Safe Space, in your Pockets</Text>

        <Text style={styles.paragraph}>
          Introducing the official Guidance Application of Guinayang National Highschool. Your private, secure way to report concerns and seek help with the guidance office anytime, anywhere.
        </Text>
      </View>

      
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Submit")}>
  <Text style={styles.buttonText}>SUBMIT A REPORT</Text>
  
</TouchableOpacity>
      

    
        <TouchableOpacity style={styles.exit} onPress={() => navigation.navigate("Test")}>
  <Text style={styles.exitText}>Test</Text>
  
</TouchableOpacity>
    
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: '#800000',
  },
  squareBox: {
    width: width * 0.85,
    backgroundColor: '#E09B56',
    border: 'black 2px solid',
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",  
    paddingVertical: 20,
    paddingHorizontal: 10,
    marginTop: 80,
    marginBottom: 20,
  },
  title: {
    color: '#C40410',
    textShadowColor: 'yellow',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 2,
    fontSize:  width * 0.065,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  image: {
    width: width * 0.4,
    
    marginBottom: 20,
    resizeMode: "contain",
  },
  subtitle: {
    color: "#ffffff",
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    fontSize: width * 0.05,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
  },
  paragraph: {
    color: "#ffffff",
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    fontSize: Math.min(width * 0.035, 20),
    textAlign: "center",
    marginHorizontal: 10,
  },
  button: {
    backgroundColor: '#C40410',
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
   elevation: 5,
  },
  buttonText: {
    color: "white",
    fontSize: Math.max(width * 0.03, 18),
    fontWeight: "bold",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  exit: {
    backgroundColor: 'transparent',
    alignItems: "center",
    marginBottom: 20,
  },
  exitText:{
    color: "white",
    fontSize: Math.max(width * 0.03, 18),
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
