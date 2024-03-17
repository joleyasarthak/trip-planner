// Import React and necessary components from React Native
import React from 'react';
import { SafeAreaView, Text, StyleSheet, View } from 'react-native';
import ProfileAvatar from '../modules/avatar';
import { EventsProfile } from './EventsScreen';

const ProfileHeader = ({name}) => {
  return(
    <View style={{
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      paddingLeft: 30,
      width: '100%',
    }}>
      <ProfileAvatar size={80} name={name}></ProfileAvatar>
      <Text style={{
        fontWeight: 'bold',
        fontSize: 40,
        marginTop: 10,
      }}>{name}</Text>
    </View>
  )
}
// Define the component
const ProfileScreen = ({ route }) => { // Destructure `route` directly here
  const { name } = route.params; // Access `name` directly from `route.params`

  return (
    <View style={styles.container} >
      <EventsProfile userID={name}>
        <ProfileHeader name={name}/>
        <Text style={{
          fontWeight: 'bold',
          fontSize: 20,
          marginTop: 10,
          marginLeft: 20,
        }}>My Beacons</Text>
        </EventsProfile>
    </View>
  );
};


// Create some basic styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C8BFFF', // Light grey background
    color: '#FFFFFF',
    paddingTop: 40,
  },
});

// Export the component so it can be imported elsewhere
export default ProfileScreen;
