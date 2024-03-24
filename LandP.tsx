import React, { useEffect, useState } from 'react';
import { SafeAreaView, FlatList, Dimensions, StatusBar, Text, View, TouchableOpacity } from 'react-native';
import CardIcon from './CardIcon';
import BottomNavbar from './AppNav';
import styles from './styles';
import useBLE from './BLEconnect';
import { Device } from 'react-native-ble-plx';
import SQLite, { SQLiteDatabase } from 'react-native-sqlite-storage';

interface ComponentDataItem {
  component_id: number;
  component_name: string;
}

const Welcome = () => {
  const { requestPermission, scanForDevices, allDevices } = useBLE();
  const numColumns = 2;
  const [windowWidth, setWindowWidth] = useState(Dimensions.get('window').width);
  const [componentData, setComponentData] = useState<ComponentDataItem[]>([]);
  const [db, setDb] = useState<SQLiteDatabase | null>(null);

  useEffect(() => {
    const initializeDatabase = async () => {
      try {
        const database: SQLiteDatabase = await SQLite.openDatabase(
          { name: 'automationApp.db', location: 'default' }
        );
        setDb(database);
        fetchComponentData(database);
      } catch (error) {
        console.error('Failed to open database:', error);
      }
    };

    initializeDatabase();

    const updateLayout = () => {
      setWindowWidth(Dimensions.get('window').width);
    };

    Dimensions.addEventListener('change', updateLayout);

    return () => {
      db?.close()
        .then(() => console.log('Database closed successfully'))
        .catch(error => console.error('Failed to close database:', error));
    };
  }, []);

  const bottomNavbarItems = [
    { label: 'Home', routeName: 'LandP' },
    { label: 'Display', routeName: 'AppView' },
    { label: 'Profile', routeName: 'hamadb' }
  ];

  const openModel = async () => {
    requestPermission((isGranted: boolean) => {
      if (isGranted) {
        console.log("Permissions Granted")
        scanForDevices();
      } else {
        console.log('Permissions not granted')
      }
    });
  }

  const handlePress = async (componentId: number, componentName: string) => {
    console.log('Pressed', componentName);
    const currentTime = new Date().toISOString();
    // Redirect to another screen or perform any action after recording the interaction
  };

  const fetchComponentData = async (database: SQLiteDatabase) => {
    database.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM Components`,
        [],
        (_, results) => {
          const len = results.rows.length;
          const components: ComponentDataItem[] = [];
          for (let i = 0; i < len; i++) {
            components.push(results.rows.item(i));
          }
          setComponentData(components);
        },
        error => console.error('Failed to fetch component data:', error)
      );
    });
  };

  const renderItem = ({ item }: { item: ComponentDataItem }) => (
    <CardIcon
      title={item.component_name}
      isOn={true}
      onIcon={'your-on-icon'} // Replace 'your-on-icon' with your actual icon names
      offIcon={'your-off-icon'} // Replace 'your-off-icon' with your actual icon names
      onPress={() => handlePress(item.component_id, item.component_name)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <View style={styles.content}>
        <View style={styles.welcome}>
          <Text style={styles.greeting}>Hello User,</Text>
          <Text style={styles.greetingStmt}>Welcome to Hama, what path would you like to take?</Text>
          <View style={{ margin: 'auto' }}>
            <TouchableOpacity onPress={openModel} style={{ padding: 10 }}><Text style={{ color: 'green' }}>Scan Devices...</Text></TouchableOpacity>
            {allDevices.map((device: Device) => (
              <Text style={{ color: 'blue' }}>{device.name}</Text>
            ))}
          </View>
        </View>
        <View style={styles.LPElements}>
          <FlatList
            data={componentData}
            renderItem={renderItem}
            keyExtractor={item => item.component_id.toString()}
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
