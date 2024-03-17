import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Image, TouchableWithoutFeedback, Keyboard} from 'react-native';
import axios from 'axios';
import { useAuth } from '../hooks/AuthContext';

const LoginScreen = ({ navigation, route }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();

  const {setCurrentUser} = route.params

  const emailToName = async (email) => {
    const response = await axios.get(
      `https://beacon-9ob2.onrender.com/user/email/${email}`, // Replace with your actual backend API
    );
    return response.data.name
  }

  const handleLogin = async () => {
    try {
      emailToName(email)
      .then((data) => {setCurrentUser(data); console.log(data)})
      .then(()=> navigation.navigate('TabNavigator', { screen: 'Events' }))
    } catch (error) {
      console.error(error);
    }
  };

  const [forgotPasswordText, setForgotPasswordText] = useState('Forgot Password?');

  const handleForgotPasswordPress = () => {
    setForgotPasswordText(prevText =>
      prevText === 'Forgot Password?'
        ? "sucks don't forget it next time LOL"
        : 'Forgot Password?'
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
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
      <TouchableOpacity onPress={handleForgotPasswordPress}>
        <Text style={styles.redirectText}>{forgotPasswordText}</Text>
      </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
            <Text style={styles.redirectText}>No account yet? Make one here!</Text>
        </TouchableOpacity>
      <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>
    </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#DCC7FF', // Adjusted to match the background color of the image
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 120,
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
  redirectText: {
    color: '#795695', // Adjusted to match the text color of the image
    fontSize: 16,
    textDecorationLine: 'underline',
    marginBottom: 25, // Spacing from forgot password to the sign-in button
    fontWeight: 'bold',
  },
  signInButton: {
    backgroundColor: '#A285FF', // Adjusted to match the button color of the image
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30, // Rounded corners for button
    elevation: 3, // Subtle shadow for button
    marginTop: 15,
  },
  buttonText: {
    color: '#FFFFFF', // Button text color
    fontSize: 18,
    fontWeight: 'bold',
  },
  logo: {
    top: 25, // Adjust top position as needed
    width: 300, // Set the width of your logo
    height: 300, // Set the height of your logo
    resizeMode: 'contain', // Keep the logo's aspect ratio
  },
});

export default LoginScreen;
