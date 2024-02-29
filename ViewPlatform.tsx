import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const RoomStatus = ({ room, onToggle }) => {
  const [isOn, setIsOn] = useState(room.isOn);

  const toggleStatus = () => {
    setIsOn(!isOn);
    onToggle(room.id, !isOn); // Pass id and new state to parent for handling
  };

  return (
    <TouchableOpacity style={styles.roomContainer} onPress={toggleStatus}>
      <Text style={styles.roomTitle}>{room.title}</Text>
      {isOn ? (
        <Text style={styles.statusOn}>On</Text>
      ) : (
        <Text style={styles.statusOff}>Off</Text>
      )}
    </TouchableOpacity>
  );
};

const DbStatus = ({ rooms, onToggleRoomStatus }) => (
  <View style={styles.container}>
    <Text style={styles.heading}>Room Status</Text>
    {rooms.map((room) => (
      <RoomStatus key={room.id} room={room} onToggle={onToggleRoomStatus} />
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 10,
    backgroundColor: "#f5f5f5",
    borderRadius: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  roomContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 15,
    marginBottom: 10,
    borderRadius: 5,
  },
  roomTitle: {
    fontSize: 16,
  },
  statusOn: {
    color: "green",
  },
  statusOff: {
    color: "red",
  },
});

export default DbStatus;
