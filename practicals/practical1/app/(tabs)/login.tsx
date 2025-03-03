import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ScrollView, Modal, FlatList } from 'react-native';
import { useRouter } from 'expo-router'; // For navigation
import { Ionicons } from '@expo/vector-icons'; // For icons

// Dummy data for country codes
const dummyCountries = [
  { name: 'Bhutan', cca2: 'BT', callingCode: '975', flag: '🇧🇹' },
  { name: 'United States', cca2: 'US', callingCode: '1', flag: '🇺🇸' },
  { name: 'India', cca2: 'IN', callingCode: '91', flag: '🇮🇳' },
  { name: 'Singapore', cca2: 'SG', callingCode: '65', flag: '🇸🇬' },
  { name: 'United Kingdom', cca2: 'GB', callingCode: '44', flag: '🇬🇧' },
  { name: 'Australia', cca2: 'AU', callingCode: '61', flag: '🇦🇺' },
  { name: 'Canada', cca2: 'CA', callingCode: '1', flag: '🇨🇦' },
  { name: 'Japan', cca2: 'JP', callingCode: '81', flag: '🇯🇵' },
  { name: 'Germany', cca2: 'DE', callingCode: '49', flag: '🇩🇪' },
  { name: 'France', cca2: 'FR', callingCode: '33', flag: '🇫🇷' },
];

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState(''); // Store phone number
  const [modalVisible, setModalVisible] = useState(false); // Control modal visibility
  const [selectedCountry, setSelectedCountry] = useState(dummyCountries[0]); // Selected country
  const [searchQuery, setSearchQuery] = useState(''); // Search query for countries
  const router = useRouter(); // For navigation

  // Filter countries based on search query
  const filteredCountries = searchQuery
    ? dummyCountries.filter(country => 
        country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        country.callingCode.includes(searchQuery)
      )
    : dummyCountries;

  // Handle country selection
  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setModalVisible(false);
    setSearchQuery('');
  };

  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Back button */}
        <TouchableOpacity 
          style={styles.back} 
          onPress={() => router.push('/(tabs)/home')} // Navigate back to home
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>

        <View style={styles.container}>
          <Text style={styles.headText}>Welcome to Gojek!</Text>
          <Text style={styles.text1}>Enter or create an account in a few easy steps.</Text>

          {/* Phone number input */}
          <View style={styles.input}>
            <Text style={styles.phonenumber}>
              Phone number
              <Text style={styles.phone_red}> *</Text>
            </Text>
            <View style={styles.phoneInputContainer}>
              {/* Country code selector */}
              <TouchableOpacity 
                style={styles.countryCode}
                onPress={() => setModalVisible(true)} // Open country picker modal
              >
                <Text style={styles.flagText}>{selectedCountry.flag}</Text>
                <Text style={styles.countryCodeText}>+{selectedCountry.callingCode}</Text>
                <Text style={styles.dropdownIcon}>▼</Text>
              </TouchableOpacity>
              <TextInput
                style={styles.phonenumbers}
                value={phoneNumber}
                onChangeText={setPhoneNumber}
                placeholder="Enter phone number"
                keyboardType="phone-pad"
              />
            </View>
          </View>
          
          {/* Continue button */}
          <TouchableOpacity 
            style={[
              styles.continueButton,
              !phoneNumber ? styles.continueButtonDisabled : {} // Disable if no phone number
            ]}
            disabled={!phoneNumber}
            onPress={() => router.push('/(tabs)/verify')} // Navigate to verify screen
          >
            <Text style={styles.continueButtonText}>Continue</Text>
          </TouchableOpacity>
          
          {/* Terms and conditions */}
          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              I agree to Gojek's <Text style={styles.termsLink}>Terms of Service</Text> & <Text style={styles.termsLink}>Privacy Policy</Text>.
            </Text>
          </View>
          
          {/* Issue with number link */}
          <TouchableOpacity style={styles.issueContainer}>
            <Text style={styles.issueText}>Issue with number?</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      
      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.fromgoto}>from <Text style={styles.gotoText}>goto</Text></Text>
      </View>

      {/* Country picker modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)} // Close modal on back press
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Country</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Search input for countries */}
            <TextInput
              style={styles.searchInput}
              placeholder="Search country or code"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />

            {/* List of countries */}
            <FlatList
              data={filteredCountries}
              keyExtractor={(item) => item.cca2}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.countryItem,
                    item.cca2 === selectedCountry.cca2 ? styles.selectedCountryItem : {} // Highlight selected country
                  ]}
                  onPress={() => handleCountrySelect(item)} // Select country
                >
                  <Text style={styles.countryFlag}>{item.flag}</Text>
                  <Text style={styles.countryName}>{item.name}</Text>
                  <Text style={styles.countryCallingCode}>+{item.callingCode}</Text>
                </TouchableOpacity>
              )}
              style={styles.countryList}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  back: {
    marginTop: 100,
  },
  backlogo: {
    width: 70,
    height: 30,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 50,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 40,
  },
  input: {
    marginTop: 20,
  },
  headText: {
    fontSize: 24,
    fontWeight: '900',
    marginBottom: 10,
  },
  text1: {
    fontSize: 13,
  },
  phonenumber: {
    fontSize: 13,
  },
  phone_red: {
    color: 'red',
    fontSize: 15,
  },
  phoneInputContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginTop: 8,
  },
  countryCode: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    borderRightWidth: 1,
    borderRightColor: '#ccc',
    minWidth: 90,
  },
  flagText: {
    fontSize: 16,
    marginRight: 5,
  },
  countryCodeText: {
    fontSize: 14,
    marginRight: 5,
  },
  dropdownIcon: {
    fontSize: 10,
    color: '#666',
  },
  phonenumbers: {
    flex: 1,
    padding: 10,
  },
  continueButton: {
    backgroundColor: '#00A14F',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
  },
  continueButtonDisabled: {
    backgroundColor: '#AAC8B8',
  },
  continueButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  termsContainer: {
    marginTop: 15,
  },
  termsText: {
    fontSize: 12,
    color: '#666',
  },
  termsLink: {
    color: '#00A14F',
    textDecorationLine: 'underline',
  },
  issueContainer: {
    marginTop: 20,
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderColor: '#000000',
    borderWidth: 1, 
    width: 140,
  },
  issueText: {
    fontSize: 13,
    textAlign: 'center',
    fontWeight: "600",
  },
  footer: {
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fromgoto: {
    fontSize: 14,
  },
  gotoText: { 
    color: 'green', 
    fontWeight: 'bold',
  },
  // Modal styles
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    maxHeight: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 5,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  countryList: {
    maxHeight: 300,
  },
  countryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  selectedCountryItem: {
    backgroundColor: '#f0f8ff',
  },
  countryFlag: {
    fontSize: 16,
    marginRight: 10,
  },
  countryName: {
    flex: 1,
    fontSize: 14,
  },
  countryCallingCode: {
    fontSize: 14,
    color: '#666',
  },
});