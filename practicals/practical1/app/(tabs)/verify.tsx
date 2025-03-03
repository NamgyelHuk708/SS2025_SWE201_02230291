import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ScrollView, View } from 'react-native';
import { useRouter } from 'expo-router'; // For navigation
import { MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons'; // For icons

export default function HomeScreen() {
  const router = useRouter(); // Initialize router for navigation

  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Back button */}
        <TouchableOpacity
          style={styles.back}
          onPress={() => router.push('/(tabs)/login')} // Navigate back to login screen
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        {/* Title */}
        <Text style={styles.headText}>Choose verification method</Text>
       
        {/* OTP via Email button */}
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => router.push('/otp')} // Navigate to OTP screen
        >
          <MaterialIcons name="email" size={24} color="#4285F4" style={styles.icon} />
          <Text style={styles.optionText}>OTP via E-mail</Text>
        </TouchableOpacity>
       
        {/* OTP via WhatsApp button */}
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => router.push('/otp')} // Navigate to OTP screen
        >
          <FontAwesome5 name="whatsapp" size={24} color="#25D366" style={styles.icon} />
          <Text style={styles.optionText}>OTP via WhatsApp</Text>
        </TouchableOpacity>
       
        {/* OTP via SMS button */}
        <TouchableOpacity
          style={styles.optionButton}
          onPress={() => router.push('/otp')} // Navigate to OTP screen
        >
          <MaterialIcons name="sms" size={24} color="#FF5722" style={styles.icon} />
          <Text style={styles.optionText}>OTP via SMS</Text>
        </TouchableOpacity>
      </ScrollView>
      
      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.fromgoto}>from <Text style={styles.gotoText}>goto</Text></Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  back: {
    marginTop: 60,
    alignSelf: 'flex-start',
    marginLeft: 20,
    padding: 5,
  },
  container: {
    flexGrow: 1,
    alignItems: 'center',
    paddingBottom: 50, 
  },
  headText: {
    marginTop: 40,
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 20,
    alignSelf: 'flex-start',
    marginLeft: 40,
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    width: "80%",
    borderColor: '#000000',
    borderWidth: 1,
  },
  icon: {
    marginRight: 10,
  },
  optionText: {
    fontSize: 16,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  fromgoto: {
    fontSize: 14,
  },
  gotoText: {
    color: 'green',
    fontWeight: 'bold',
  },
});