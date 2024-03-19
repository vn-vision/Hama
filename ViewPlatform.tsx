import React, { useState, } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { PRI_COLOR, SEC_COLOR, THR_COLOR } from "./styles";

interface Room {
  id: string,
  title: string,
  isOn:boolean,
}
interface RoomStatusProps {
  room: Room,
  onToggle: (id: string, isOn:boolean) => void;
  style: object
}
interface DbStatusProps {
  rooms: Room[];
  onToggleRoomStatus: (id: string, isOn: boolean) => void;
}

const RoomStatus = ({ room, onToggle }:RoomStatusProps) => {
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



const DbStatus = ({ rooms, onToggleRoomStatus }:DbStatusProps) => (
  <View style={styles.container}>
    <Text style={styles.heading}>Room Status</Text>
    {rooms.map((room) => (
      <RoomStatus key={room.id} room={room} onToggle={onToggleRoomStatus} style={styles.roomTitle}/>
    ))}
  </View>
);

const styles = StyleSheet.create({
  container: {
    padding: 10,
    margin: 'auto',
    backgroundColor: PRI_COLOR,
    borderRadius: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: SEC_COLOR,
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
    color: THR_COLOR
  },
  statusOn: {
    color: "green",
  },
  statusOff: {
    color: "red",
  },
});

export default DbStatus;
