import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Modal } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';

const MapScreen = ({route}) => {
  const {currentUser, setUpdate} = route.params
  const userID = currentUser;

  const [markers, setMarkers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [tempMarker, setTempMarker] = useState({});
  const [markerTitle, setMarkerTitle] = useState('');
  const [markerDescription, setMarkerDescription] = useState('');
  const [markerDate, setMarkerDate] = useState('');
  const [event, setEvent] = useState([]);

  const handleMapPress = (e) => {
    const { coordinate } = e.nativeEvent;
    setTempMarker({
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
    });
    setModalVisible(true);
  };

  const addEvent = async () => {

    const eventData = {
        date_expected: markerDate,
        author_id: userID,
        location: { latitude: tempMarker.latitude, longitude: tempMarker.longitude },
        title: markerTitle,
        description: markerDescription,
        invited: [userID],
        status: "EVENT",
    }

    try {
        const response = await fetch('https://beacon-9ob2.onrender.com/event/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(eventData),
        });

        const data = await response.json();

        if (response.ok){
            setEvent([...event, eventData]);
            setUpdate((err) => !err)
        } else {
            console.log("Error adding event: ", data);
        }

        setMarkers([...markers, { ...tempMarker, title: markerTitle, description: markerDescription }]);
        setModalVisible(!modalVisible);
        setMarkerTitle('');
        setMarkerDescription('');

    } catch (error) {
        console.error(error)
    }
  }

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(`https://beacon-9ob2.onrender.com/event/${userID}`, {
          method: 'GET',
        });
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setEvent(data); // Assuming the data is in the format expected by your application
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, [])

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
            latitude: 43.549698,
            longitude: -79.663202,
            latitudeDelta: 0.013,
            longitudeDelta: 0.013,
        }}
        onPress={handleMapPress} // This will now only trigger when the map itself is tapped, not the markers.
        >
  {event.map((ev, index) => (
    <Marker
        key={index}
        coordinate={{ latitude: ev.location.latitude, longitude: ev.location.longitude }}
        onPress={(e) => {
            // Prevents the modal from opening when a marker is tapped
            e.stopPropagation();
        }}
    >
        <Callout tooltip>
            <View style={styles.calloutView}>
            <Text style={styles.calloutTitle}>{ev.title}</Text>
            <Text style={styles.calloutDescription}>{ev.description}</Text>
            <Text style={styles.calloutDescription}>{ev.date_expected}</Text>
            </View>
        </Callout>
    </Marker>
))}
    </MapView>

    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
            setModalVisible(!modalVisible);
        }}
        >
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Add Marker</Text>
            <Text style={styles.modalInputLabel}>Title:</Text>
            <TextInput
                style={styles.modalTextInput}
                placeholder="                       "
                onChangeText={setMarkerTitle}
                value={markerTitle}
            />
            <Text style={styles.modalInputLabel}>Description:</Text>
            <TextInput
                style={styles.modalTextInput}
                placeholder="                       "
                onChangeText={setMarkerDescription}
                value={markerDescription}
            />
            <Text style={styles.modalInputLabel}>Date/Time:</Text>
            <TextInput
                style={styles.modalTextInput}
                placeholder="                       "
                onChangeText={setMarkerDate}
                value={markerDate}
            />
            <View style={styles.buttonContainer}>
                <Button
                title="Add"
                onPress={addEvent}
                />
                <Button
                title="Close"
                onPress={() => {
                    setModalVisible(!modalVisible);
                }}
                />
            </View>
            </View>
        </View>
        </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    width: 200, // Set a fixed width for TextInput
  },
  calloutView: {
    width: 150,
    height: 'auto',
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 0.5,
  },
  calloutTitle: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  calloutDescription: {
    textAlign: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  modalInputLabel: {
    marginBottom: 5,
  },
  modalTextInput: {
    marginBottom: 15,
    paddingHorizontal: 50,
    paddingVertical: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 150,
    width: '100%',
  },
});

export default MapScreen;
