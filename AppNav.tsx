import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import styles from './styles';

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
    <View style={styles.nav_container}>
      {navigationItems.map(({ label, routeName }, index) => (
        <TouchableOpacity key={index} style={styles.navItem} onPress={() => handleNavbarPress(routeName)}>
          <Text style={styles.navItem}>{label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};


export default BottomNavbar;
