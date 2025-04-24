# Practical Report: Implementing Authentication with Supabase in React Native

## Objective of the Practical
The objective of this practical session was to implement user authentication (login and sign-up) using Supabase in a React Native mobile application. The main goal was to integrate both password-based and passwordless (magic link) authentication methods, enabling secure and user-friendly access for app users.

## 1. What I Have Done
In this practical, I implemented Supabase authentication in a React Native project using the following steps:

### Project Setup:
- Created a new project in the Supabase dashboard.
- Installed required libraries:
  ```
  expo install @supabase/supabase-js @react-native-async-storage/async-storage @rneui/themed react-native-url-polyfill
  ```

### Supabase Configuration:
- Created a helper file `lib/supabase.ts` to initialize the Supabase client using the project URL and Anon Key.
- Configured session management with AsyncStorage and handled session auto-refresh using AppState.

### Authentication Component:
- Built a component `components/Auth.tsx` with:
  - Two input fields for email and password using @rneui/themed.
  - Two buttons for Sign In and Sign Up.
- Implemented:
  - `signInWithEmail()` to allow users to log in using email and password.
  - `signUpWithEmail()` to allow new users to register and receive a verification email.

### Magic Link (Passwordless Login):
- Enabled passwordless email authentication (magic link) in Supabase settings.
- Designed a new screen `/auth/magicLink` where users can input their email and receive a login link.

## 2. What I Have Learnt
Through this practical, I gained hands-on experience in:
- Integrating Supabase authentication with a React Native app.
- Using AsyncStorage for session persistence.
- Understanding session management (auto-refresh, login state).
- Implementing both traditional login (email/password) and modern login methods (magic link).
- Structuring React Native components with real-time feedback and loading states.

## 3. What Challenges I Have Faced
During the practical, I faced the following challenges:
- **AsyncStorage compatibility**: Initially, Supabase's session persistence did not work properly because the right storage library was not configured.
- **Magic link email not arriving**: Sometimes, the email containing the magic link took a long time to arrive or landed in the spam folder.
- **URL Polyfill error**: There was a missing polyfill error due to URL usage in Supabase.

## 4. How I Overcame the Challenges
- Resolved AsyncStorage issues by using the correct import and installing it using Expo's managed workflow.
- Debugged the magic link issue by testing with multiple email providers and checking spam/junk folders.
- Fixed URL polyfill issues by importing `react-native-url-polyfill/auto` at the top of the Supabase client file.
- Followed official Supabase documentation and community threads to troubleshoot errors.

## Conclusion
This practical helped me understand how to securely integrate a backend-as-a-service (BaaS) authentication solution like Supabase into a React Native app. I learned not only the technical integration part but also how to handle real-world authentication issues and improve user experience with features like magic links.