import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';

interface BottomNavbarProps {
  navigationItems: { label: string, routeName: string }[]; // Update to include route names
}

const BottomNavbar = ({ navigationItems }: BottomNavbarProps) => {
  const navigation: NavigationProp<any> = useNavigation();

  const handleNavbarPress = (routeName: string) => {
    console.log('Bottom Navbar Pressed', routeName);
    navigation.navigate(routeName); // Navigate to the specified route
  };

  return (
    <View style={styles.container}>
      {navigationItems.map(({ label, routeName }, index) => (
        <TouchableOpacity key={index} style={styles.navItem} onPress={() => handleNavbarPress(routeName)}>
          <Text>{label}</Text>
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
