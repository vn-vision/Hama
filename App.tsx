import React, { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, FlatList, Dimensions, StatusBar, Text, View } from 'react-native';
import CardIcon from './CardIcon';
import BottomNavbar from './AppNav';

interface CardDataItem {
  id: string;
  title: string;
  isOn: boolean;
  onIcon: string;
  offIcon: string;
}

const ResizablePressableComponent = () => {
  const handlePress = (id: string) => {
    console.log('Pressed', id);
  };

  // Data array to represent your CardIcons
  const cardData: CardDataItem[] = [
    { id: 'A', title: 'Lighting', isOn: true, onIcon: 'lightbulb-outline', offIcon: 'lightbulb' },
    { id: 'B', title: 'Temperature', isOn: true, onIcon: 'thermostat', offIcon: 'thermostat-auto' },
    // Add more card details here as needed
    { id: 'C', title: 'Humidity', isOn: true, onIcon: 'air', offIcon: 'ac-unit' },
    { id: 'D', title: 'Security', isOn: true, onIcon: 'security', offIcon: 'security-update-warning' },
    // more items 
    { id: 'E', title: 'Task Assistant', isOn: true, onIcon: 'cleaning-services', offIcon: 'sensors-off' },
    { id: 'F', title: 'Other', isOn: true, onIcon: 'add', offIcon: 'add-box' },
  ];

  const numColumns = 2; // Number of columns

  const renderItem = ({ item }: { item: CardDataItem }) => (
    <CardIcon
      title={item.title}
      isOn={item.isOn}
      onIcon={item.onIcon}
      offIcon={item.offIcon}
      onPress={() => handlePress(item.id)}
      containerWidth={cardContainerWidth}
    />
  );

  const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width);

  useEffect(() => {
    const updateLayout = () => {
      setWindowWidth(Dimensions.get('window').width);
    };

    Dimensions.addEventListener('change', updateLayout);

    return () => {};
  }, []);

  const cardContainerWidth = (windowWidth - 20 - (numColumns - 1) * 10) / numColumns; // Subtract padding and margin

  // Function to handle bottom navbar item press
  const handleNavbarPress = (item: string) => {
    console.log('Bottom Navbar Pressed', item);
    // You can navigate to different screens based on the item pressed here
  };

  // Define your bottom navbar items
  const bottomNavbarItems = ['Home', 'Settings', 'Profile']; // Example items, customize as needed

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <View style={styles.content}>
        <View style={styles.welcome}>
          <Text style={styles.greeting}>Hello User,</Text>
          <Text style={styles.greetingStmt}>Welcome to Hama, what path would you like to take?</Text>
        </View>
        <View>
          <FlatList
            data={cardData}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            numColumns={numColumns}
            contentContainerStyle={styles.listContentContainer}
          />
        </View>
      </View>
      <BottomNavbar navigationItems={bottomNavbarItems} onPress={handleNavbarPress} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  listContentContainer: {
    paddingHorizontal: 5,
    paddingTop: 20,
    justifyContent: 'space-between',
  },
  welcome: {
    marginTop: 30,
    marginHorizontal: 10
  },
  greeting: {
    fontSize: 28,
    fontFamily: 'Georgia',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  greetingStmt: {
    fontSize: 20,
    fontFamily: 'Georgia',
    letterSpacing: 0.5,
    lineHeight: 24,
  },
});

export default ResizablePressableComponent;
