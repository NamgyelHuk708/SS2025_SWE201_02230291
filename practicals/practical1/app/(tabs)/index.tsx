import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router'; // For navigation

export default function LandingPage() {
  const router = useRouter();

  useEffect(() => {
    // Navigate to the home page after 2 seconds
    const timer = setTimeout(() => {
      router.replace('/(tabs)/home'); // Replace landing page with home page
    }, 2000);

    return () => clearTimeout(timer); // Cleanup timer to avoid memory leaks
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('@/assets/images/logo.png')} // Display your logo
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 200, // Adjust logo size
    height: 200, // Adjust logo size
  },
});