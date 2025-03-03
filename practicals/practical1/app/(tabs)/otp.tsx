import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { CodeField, useBlurOnFulfill, useClearByFocusCell } from 'react-native-confirmation-code-field'; // For OTP input
import { useRouter } from 'expo-router'; // For navigation
import { Ionicons } from '@expo/vector-icons'; // For icons

const CELL_COUNT = 4; // Number of OTP digits

export default function OTPScreen() {
  const [value, setValue] = React.useState(''); // Store OTP value
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT }); // Auto-blur when OTP is complete
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({ value, setValue }); // Clear OTP on focus
  const router = useRouter(); // For navigation

  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Back button */}
        <TouchableOpacity
          style={styles.back}
          onPress={() => router.push('/(tabs)/verify')} // Navigate back to verify screen
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        
        {/* Title and subtitle */}
        <Text style={styles.headtext}>Enter OTP sent via E-Mail</Text>
        <Text style={styles.subtitle}>We've sent OTP to ranjungyeshi99@gmail.com</Text>
       
        {/* OTP input field */}
        <View style={styles.otpContainer}>
          <Text style={styles.otpLabel}>OTP
            <Text style={styles.textred}> *</Text>
          </Text>
         
          <CodeField
            ref={ref}
            {...props}
            value={value}
            onChangeText={setValue} // Update OTP value
            cellCount={CELL_COUNT} // Number of OTP cells
            rootStyle={styles.codeFieldRoot}
            keyboardType="number-pad" // Numeric keyboard
            renderCell={({ index, symbol, isFocused }) => (
              <View
                key={index}
                style={styles.cell}
                onLayout={getCellOnLayoutHandler(index)} // Handle cell focus
              >
                <Text style={styles.cellText}>
                  {symbol} {/* Display OTP digit */}
                </Text>
              </View>
            )}
          />
        </View>
       
        {/* Try another method button */}
        <TouchableOpacity 
          style={styles.tryAnotherButton}
          onPress={() => router.push('/verify')} // Navigate to verify screen
        >
          <Text style={styles.tryAnotherText}>Try another method</Text>
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
    backgroundColor: '#fff',
  },
  container: {
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  back: {
    marginBottom: 40,
  },
  headtext: {
    fontSize: 18,
    fontWeight: '900',
    marginBottom: 10,
    marginLeft: 17,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 30,
    marginLeft: 17,
  },
  otpContainer: {
    marginBottom: 40,
    marginLeft: 17,
  },
  otpLabel: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  codeFieldRoot: {
    width: '50%',
    marginRight: 'auto',
  },
  textred: {
    color: 'red',
    fontSize: 17,
  },
  cell: {
    width: 40,
    height: 40,
    borderBottomWidth: 2,
    borderBottomColor: '#ddd',
    marginRight: 10,
  },
  cellText: {
    fontSize: 20,
    textAlign: 'center',
    lineHeight: 38,
  },
  tryAnotherButton: {
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderColor: '#000000',
    borderWidth: 1,
    width: 150,
    marginLeft: 17,
  },
  tryAnotherText: {
    fontSize: 13,
    textAlign: 'center',
    fontWeight: "600",
  },
  footer: {
    paddingVertical: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  fromgoto: {
    fontSize: 14,
  },
  gotoText: {
    color: 'green',
    fontWeight: 'bold',
  },
});
