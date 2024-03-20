// Import React and necessary components from React Native
import React from "react";
import { SafeAreaView, Text, StyleSheet, View, Button } from "react-native";
import ProfileAvatar from "../modules/avatar";
import { EventsProfile } from "./EventsScreen";
import { useAuth } from "../hooks/AuthContext.js";
import { NativeEventEmitter } from "react-native";

const ProfileHeader = ({ name }) => {
  const { user } = useAuth();
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        paddingLeft: 30,
        width: "100%",
      }}
    >
      <ProfileAvatar name={name} size={80}></ProfileAvatar>
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 40,
          marginTop: 10,
        }}
      >
        {user.data}
      </Text>
    </View>
  );
};
// Define the component
const ProfileScreen = ({ route }) => {
  // Destructure `route` directly here
  const { user } = useAuth();
  const name = user.data;
  return (
    <View style={styles.container}>
      {/* <EventsProfile userID={name}> */}
      <ProfileHeader name={name} />
      <Text
        style={{
          fontWeight: "bold",
          fontSize: 20,
          marginTop: 10,
          marginLeft: 20,
        }}
      >
        My Voyages
      </Text>
      {/* </EventsProfile> */}
    </View>
  );
};

// Create some basic styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C8BFFF", // Light grey background
    color: "#FFFFFF",
    paddingTop: 40,
  },
});

// Export the component so it can be imported elsewhere
export default ProfileScreen;
