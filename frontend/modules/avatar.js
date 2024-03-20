import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAuth } from "../hooks/AuthContext";

const ProfileAvatar = ({ name, size = 50 }) => {
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  const styles = StyleSheet.create({
    avatar: {
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor: "#007bff",
      justifyContent: "center",
      alignItems: "center",
    },
    text: {
      color: "white",
      fontSize: size / 2,
    },
  });
  return (
    <View style={styles.avatar}>
      <Text style={styles.text}>{getInitials(name || "User")}</Text>
    </View>
  );
};

export default ProfileAvatar;
