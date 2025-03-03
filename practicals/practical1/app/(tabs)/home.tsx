import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView, StatusBar, ScrollView, Dimensions } from 'react-native';
import { useRouter } from 'expo-router'; // For navigation

const { width } = Dimensions.get('window'); // Get screen width

const App = () => {
  const router = useRouter(); // Initialize router
  const [currentPage, setCurrentPage] = useState(0); // Track current slide
  const scrollViewRef = useRef(null); // Reference to ScrollView
  const totalSlides = 4; // Total number of slides

  // Slides data
  const slides = [
    { image: require('@/assets/images/img1.jpeg'), title: 'Transport & logistics', description: 'Daily commute and goods delivery made easy.' },
    { image: require('@/assets/images/img2.jpeg'), title: 'Get food & groceries', description: 'Either needs or cravings, we got you covered.' },
    { image: require('@/assets/images/img3.png'), title: 'Payment', description: 'Pay utility bills, phone credit, and transfer money from your phone.' },
    { image: require('@/assets/images/img4.jpeg'), title: 'Welcome to Gojek!', description: 'Your go-to app for a hassle-free life. We\'re here to help with all your needs anytime, anywhere.' }
  ];

  // Handle scroll to detect current slide
  const handleScroll = (event) => {
    const { contentOffset } = event.nativeEvent;
    const pageIndex = Math.round(contentOffset.x / width);

    // Loop to first slide if scrolled past the last slide
    if (pageIndex >= totalSlides + 1) {
      scrollToPage(1, false);
      setCurrentPage(0);
    } 
    // Loop to last slide if scrolled before the first slide
    else if (pageIndex <= 0) {
      scrollToPage(totalSlides, false);
      setCurrentPage(totalSlides - 1);
    } 
    // Update current slide
    else {
      setCurrentPage(pageIndex - 1);
    }
  };

  // Add cloned slides for infinite scrolling
  const allSlides = [slides[slides.length - 1], ...slides, slides[0]];

  // Scroll to a specific slide
  const scrollToPage = (pageIndex, animated = true) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x: pageIndex * width, animated });
    }
  };

  // Navigate to a slide when a pagination dot is clicked
  const goToPage = (pageIndex) => {
    scrollToPage(pageIndex + 1, true);
    setCurrentPage(pageIndex);
  };

  // Initialize scroll position to the first real slide
  useEffect(() => {
    setTimeout(() => {
      scrollToPage(1, false);
    }, 100);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FFFFFF" barStyle="dark-content" />
      
      {/* Header with Logo and Language Selector */}
      <View style={styles.header}>
        <Image source={require('@/assets/images/logo.png')} style={styles.logo} resizeMode="contain" />
        <TouchableOpacity style={styles.languageButton}>
          <Text style={styles.languageText}>English</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.contentContainer}>
        {/* Horizontal ScrollView for slides */}
        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={handleScroll}
          style={styles.scrollView}
        >
          {allSlides.map((slide, index) => (
            <View key={index} style={styles.slide}>
              <Image source={slide.image} style={styles.illustration} resizeMode="contain" />
              <Text style={styles.welcomeText}>{slide.title}</Text>
              <Text style={styles.subText}>{slide.description}</Text>
            </View>
          ))}
        </ScrollView>
        
        {/* Pagination Dots */}
        <View style={styles.paginationContainer}>
          {slides.map((_, index) => (
            <TouchableOpacity 
              key={index} 
              style={[styles.paginationDot, currentPage === index && styles.activeDot]}
              onPress={() => goToPage(index)}
            />
          ))}
        </View>
      </View>
      
      {/* Bottom Buttons and Terms */}
      <View style={styles.bottomContainer}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.loginButton} onPress={() => router.push('/(tabs)/login')}>
            <Text style={styles.loginButtonText}>Log in</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.signupButton} onPress={() => router.push('/(tabs)/login')}>
            <Text style={styles.signupButtonText}>I'm new, sign me up</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.termsText}>
          By logging in or registering, you agree to our{' '}
          <Text style={styles.termsLink}>Terms of service</Text> and{' '}
          <Text style={styles.termsLink}>Privacy policy</Text>.
        </Text>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
  },
  logo: {
    width: 100,
    height: 50,
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 6,
  },
  languageText: {
    fontSize: 14,
    color: '#333333',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  slide: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  illustrationContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  illustration: {
    width: '85%',
    height: 200,
    borderRadius: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subText: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 10,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E0E0E0',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#00AA13', // Gojek green color
    width: 20,
  },
  bottomContainer: {
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: '#00AA13', // Gojek green color
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupButton: {
    borderWidth: 1,
    borderColor: '#00AA13', // Gojek green color
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',
  },
  signupButtonText: {
    color: '#00AA13', // Gojek green color
    fontSize: 16,
    fontWeight: 'bold',
  },
  termsText: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
    lineHeight: 18,
  },
  termsLink: {
    color: '#00AA13', // Gojek green color
  },
});

export default App;