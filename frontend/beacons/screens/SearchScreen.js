// Import React and necessary components from React Native
import React, { useState } from 'react';
import { View, TextInput, Button, Text, Image, FlatList, StyleSheet } from 'react-native';

const handleFriendRequest = async () => {
  try {
    const response = await fetch('https://beacon-9ob2.onrender.com/user/friend/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: user._id,
      }),
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error)
  }
}

// Define the component
const UserCard = ({ user }) => (


  <View style={styles.card}>
    <Text style={styles.username}>{user.name}</Text>
    <Button title="Friend" onPress={handleFriendRequest} />
  </View>
);

const SearchScreen = () => {

  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);

  const searchUsers = async () => {
    console.log(query);
    try {
      const response = await fetch(`https://beacon-9ob2.onrender.com/user/${query}`);
      const data = await response.json();
      setUsers([...users, data]);
      console.log(data) // assuming the response data is an array of user objects
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={query}
        onChangeText={setQuery}
        placeholder="Search users..."
      />
      <Button title="Search" onPress={searchUsers} />
      {users.map((user) => (
        <UserCard key={user._id} user={user} />
      ))}
    </View>
  );
};

// Create some basic styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DCC7FF',
  },
  text: {
    fontSize: 18,
    color: '#333', // Dark grey text
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  card: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  username: {
    fontSize: 18,
  },
});

// Export the component so it can be imported elsewhere
export default SearchScreen;