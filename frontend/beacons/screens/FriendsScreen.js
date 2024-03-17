// Import React and necessary components from React Native
import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import ProfileAvatar from '../modules/avatar';
import axios from 'axios';


// Define the component
const getAllUsers = async () => {
  const response = await axios.get(
    `https://beacon-9ob2.onrender.com/user/all`, // Replace with your actual backend API
  );
  return response.data
}
const FriendsScreen = ({route}) => {
  const {currentUser} = route.params
  const [users, setUsers] = useState([])
  const isFocused = useIsFocused()

  useEffect(() => {
    if (isFocused) {
      getAllUsers()
      .then((data) => {setUsers(() => [...data]); console.log(data)})
      .catch((err) => console.log(err))
    }
  },[isFocused])
  return (
    <View style={styles.container}>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontSize: 30, fontWeight: 'bold'}}>Friends</Text>
      </View>
      {users.map((person, index) => {
        const user = users[users.length - 1 - index]
        return(
        <SafeAreaView style={{flexDirection: 'row', alignItems: 'center', gap: 10, marginVertical: 10}}>
          <ProfileAvatar size={30} name={user.name}></ProfileAvatar>
          <Text style={{}}>{user.name}</Text>
        </SafeAreaView>
        )
      })}
    </View>
  );
};

// Create some basic styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    paddingTop: 80,
    backgroundColor: '#C8BFFF', // Light grey background
  },
  text: {
    fontSize: 18,
    color: '#333', // Dark grey text
  },
});

// Export the component so it can be imported elsewhere
export default FriendsScreen;