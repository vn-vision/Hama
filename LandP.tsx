import React from 'react';
import { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, Dimensions, StatusBar, Text, View, Button,  Alert} from 'react-native';
import CardIcon from './CardIcon';
import BottomNavbar from './AppNav';
import styles from './styles';
import useBLE from './BLEconnect';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Device } from 'react-native-ble-plx';

//CardDataItems Interface, specifying the type
export interface CardDataItem {
  id: string;
  title: string;
  isOn: boolean;
  onIcon: string;
  offIcon: string;
}

const Welcome = () => {
  // request persmissions hook for ble connection
  const {requestPermission, scanForDevices, allDevices} = useBLE();
 
  const openModel = async () => {
    requestPermission((isGranted: boolean)=>{
      if (isGranted){
        console.log("Permissions Granted")
        scanForDevices();
      }
      else {
        console.log('Permissions not granted')
      }
    });
  }
    // adjust the display with change in layout for the card Icons
    const numColumns = 2;

    const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width);
    useEffect(() => {
      const updateLayout = () => {
        setWindowWidth(Dimensions.get('window').width);
      };
  
      Dimensions.addEventListener('change', updateLayout);
  
      return () => {};
    }, []);
  
  const bottomNavbarItems = [
    { label: 'Home', routeName: 'LandP' },
    { label: 'Display', routeName: 'AppView' },
    { label: 'Profile', routeName: 'ProfileP' }
  ]

  // what happens when a cardIcon is pressed
  const handlePress = (id: string) => {
    console.log('Pressed', id);
  };

  // Data array to represent your CardIcons
  const componentData: CardDataItem[] = [
    { id: 'A', title: 'Lighting', isOn: true, onIcon: 'lightbulb-outline', offIcon: 'lightbulb' },
    { id: 'B', title: 'Temperature', isOn: true, onIcon: 'thermostat', offIcon: 'thermostat-auto' },
    // Add more card details here as needed
    { id: 'C', title: 'Humidity', isOn: true, onIcon: 'air', offIcon: 'ac-unit' },
    { id: 'D', title: 'Security', isOn: true, onIcon: 'security', offIcon: 'security-update-warning' },
    // more items 
    { id: 'E', title: 'Task Assistant', isOn: true, onIcon: 'cleaning-services', offIcon: 'sensors-off' },
    { id: 'F', title: 'Other', isOn: true, onIcon: 'add', offIcon: 'add-box' },
  ];


  // Render the cardItems with their types
  const renderItem = ({ item }: { item: CardDataItem }) => (
    <CardIcon
      title={item.title}
      isOn={item.isOn}
      onIcon={item.onIcon}
      offIcon={item.offIcon}
      onPress={() => handlePress(item.id)}
    />
  );


  // The return statement
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <View style={styles.content}>
        <View style={styles.welcome}>
          <Text style={styles.greeting}>Hello User,</Text>
          <Text style={styles.greetingStmt}>Welcome to Hama, what path would you like to take?</Text>
          <View style={{margin:'auto'}}>
            <TouchableOpacity onPress={openModel} style={{padding:10}}><Text style={{color:'green'}}>Scan Devices...</Text></TouchableOpacity>
            {allDevices.map((device: Device)=>(
              <Text style={{color:'blue'}}>{device.name}</Text>
            ))}
          </View>
        </View>
        <View style={styles.LPElements}>
          <FlatList
            data={componentData}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            numColumns={numColumns}
            contentContainerStyle={styles.listContentContainer}
          />
        </View>
      </View>
      <BottomNavbar navigationItems={bottomNavbarItems} />
    </SafeAreaView>
  );
};

export default Welcome;
