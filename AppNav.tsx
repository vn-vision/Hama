import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';

interface BottomNavbarProps {
  navigationItems: string[];
  onPress: (item: string) => void;
}

const BottomNavbar = ({ navigationItems, onPress }: BottomNavbarProps) => {
  return (
    <View style={styles.container}>
      {navigationItems.map((item, index) => (
        <TouchableOpacity key={index} style={styles.navItem} onPress={() => onPress(item)}>
          <Text>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    backgroundColor: '#fff', // Example background color, customize as needed
    borderTopWidth: 1,
    borderTopColor: '#ccc',
  },
  navItem: {
    padding: 10,
  },
});

export default BottomNavbar;
