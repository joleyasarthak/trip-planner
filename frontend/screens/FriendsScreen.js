// Import React and necessary components from React Native
import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, StyleSheet } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import ProfileAvatar from "../modules/avatar";
import axios from "axios";
import { useAuth } from "../hooks/AuthContext";

// Define the component
const getUserFriends = async (user) => {
  const response = await axios.get(
    `${process.env.EXPO_PUBLIC_BACKEND_URI}/user/email/${user}`
  );
  return response.data;
};
const FriendsScreen = ({ route }) => {
  const { user } = useAuth();
  const userID = user.email;
  const [users, setUsers] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      getUserFriends(userID)
        .then((data) => {
          setUsers(data.friends);
          // console.log(data.friends);
        })
        .catch((err) => console.log(err));
    }
  }, [isFocused]);
  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text style={{ fontSize: 30, fontWeight: "bold" }}>Friends</Text>
      </View>
      {users.map((person, index) => (
        <SafeAreaView
          key={index} // Add a unique key for each item in the list
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginVertical: 10,
          }}
        >
          <ProfileAvatar size={30} name={person} />
          <Text>{person}</Text>
        </SafeAreaView>
      ))}
    </View>
  );
};

// Create some basic styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 50,
    paddingTop: 80,
    backgroundColor: "#C8BFFF", // Light grey background
  },
  text: {
    fontSize: 18,
    color: "#333", // Dark grey text
  },
});

// Export the component so it can be imported elsewhere
export default FriendsScreen;
