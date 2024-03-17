import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import axios from 'axios';
import { useAuth } from '../hooks/AuthContext';
import { Ionicons } from '@expo/vector-icons';

const RegisterScreen = ({ navigation, route }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { signIn } = useAuth();

  const {setCurrentUser} = route.params

  const handleRegister = async () => {
    // Replace with your actual backend API endpoint
    console.log(email, password, name)
    const registerUser = async (email, password, name) => {
      try {
        const response = await axios.post(
          'https://beacon-9ob2.onrender.com/user',
          {
            email: email,
            password: password,
            name: name,
          }
        );
        if (response.status === 200) {
          setCurrentUser(name)
          navigation.navigate('TabNavigator');
        }
      } catch (error) {
        console.error(error);
      }
    };
    registerUser(email, password, name);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        behavior={'padding'}
        keyboardVerticalOffset={64}
        style={styles.container}
      >
      
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={30} color="white" />
      </TouchableOpacity>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
        placeholder="Name"
        placeholderTextColor="#A7A7A7"
      />
      <TextInput
        style={styles.input}
        onChangeText={setEmail}
        value={email}
        placeholder="Email"
        placeholderTextColor="#A7A7A7"
      />
      <TextInput
        style={styles.input}
        onChangeText={setPassword}
        value={password}
        placeholder="Password"
        placeholderTextColor="#A7A7A7"
        secureTextEntry
      />
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.redirectText}>
                Already have an account? Login here!
              </Text>
            </TouchableOpacity>
      <TouchableOpacity style={styles.signUpButton} onPress={handleRegister}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DCC7FF',
    alignItems: 'center',
    justifyContent: 'flex-start', // Changed to 'flex-start' to align items to the top
    paddingTop: 50, // Add padding to push the content down, adjust as needed
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF', // Adjusted to match the text color of the image
    marginBottom: 30, // Spacing from title to inputs
  },
  input: {
    height: 50,
    width: '80%',
    backgroundColor: '#FFFFFF', // Input field background color
    marginBottom: 30,
    paddingHorizontal: 20,
    borderRadius: 25, // Rounded corners for input fields
    fontSize: 16,
    color: '#000000', // Input text color
  },
  login: {
    color: '#FFFFFF', // Adjusted to match the text color of the image
    fontSize: 16,
    textDecorationLine: 'underline',
    marginBottom: 40, // Spacing from login to the sign-up button
  },
  signUpButton: {
    backgroundColor: '#A285FF', // Adjusted to match the button color of the image
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30, // Rounded corners for button
    elevation: 3, // Subtle shadow for button
  },
  buttonText: {
    color: '#FFFFFF', // Button text color
    fontSize: 18,
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    top: 100, // Adjust the value as needed for your layout
    left: 25, // Adjust the value as needed for your layout
    flexDirection: 'row', // Icon and text in a row
    alignItems: 'center', // Center items vertically in the row
  },
  redirectText: {
    color: '#795695', // Adjusted to match the text color of the image
    fontSize: 16,
    textDecorationLine: 'underline',
    marginBottom: 25, // Spacing from forgot password to the sign-in button
    fontWeight: 'bold',
  },
  logo: {
    top: 25, // Adjust top position as needed
    width: 300, // Set the width of your logo
    height: 300, // Set the height of your logo
    resizeMode: 'contain', // Keep the logo's aspect ratio
  },
});

export default RegisterScreen;
