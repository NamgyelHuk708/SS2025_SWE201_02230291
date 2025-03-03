# Practical Report

**Title:** Building a Gojek for andriod

---

## 1. Documentation

For this practical, I worked on creating a mobile application with multiple screens using React Native and Expo Router. The app is designed to help users log in or sign up by verifying their phone number through an OTP (One-Time Password). Here’s a breakdown of what I built:

1. **Landing Page**: A simple screen with the app’s logo. After 2 seconds, it automatically takes the user to the home screen.
2. **Login Screen**: Here, users can enter their phone number. There’s also a country code picker to select the correct country code. Once the number is entered, they can proceed to the OTP verification screen.
3. **OTP Verification Screen**: Users can enter a 4-digit OTP sent to them via email, WhatsApp, or SMS.
4. **Home Screen**: This screen lets users choose how they want to receive their OTP—via email, WhatsApp, or SMS.

### Tools and Libraries Used:
- **React Native**: For building the app’s interface.
- **Expo Router**: To handle navigation between screens.
- **Ionicons and MaterialIcons**: For adding icons like the back button and email/SMS icons.
- **Modal and FlatList**: For the country code picker feature.
- **CodeField**: A library for handling the OTP input fields.

### How It Works:
- Each screen is a separate component, making the code modular and easy to manage.
- Navigation between screens is handled using `useRouter` from Expo Router.
- The country code picker uses a modal to display a list of countries. Users can search for their country, and the list updates dynamically.
- The OTP screen uses a special input field that automatically moves focus to the next digit as the user types.

---

## 2. Reflection

### What Went Well:
- Basic ui developed 
- I was able to implement navigation between screens smoothly using Expo Router. 

### Challenges I Faced:
- Gettting familir with react and expo was challanging
- At first, I struggled with Expo Router because it was new to me. Figuring out how to navigate between screens took some time, but the documentation helped a lot.
- The OTP input field had some quirks, like managing focus between the digits. It took some trial and error to get it right.

### What I Learned:
- How to use Expo Router for navigation in a React Native app.
- How to create reusable components
- The importance of state management in handling user input and updating the UI dynamically.

### What I’d Do Differently Next Time:
- Make the app more functionable
- Add more validation for phone numbers and OTP inputs to make the app more user-friendly.
- Improve the UI with animations and better error messages to enhance the user experience.

---

## Conclusion

This practical was a great opportunity to build a real-world mobile application from scratch. I learned a lot about navigation, state management, and integrating third-party libraries. While there were challenges along the way, solving them helped me grow as a developer. I’m proud of what I built, and I’m excited to apply these skills to future projects.

---
