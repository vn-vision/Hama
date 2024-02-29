import React, { useState, useEffect } from "react";
import { View, Dimensions, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CardIcon from "./CardIcon";
import BottomNavbar from "./AppNav";
import { StyleSheet } from "react-native";
import { CardDataItem } from "./LandP";
import DbStatus from "./ViewPlatform";

const ViewArea = () => {
  const [isLandscape, setIsLandscape] = useState(
    Dimensions.get("window").width > Dimensions.get("window").height
  );

  useEffect(() => {
    const dimensionChange = () => {
      setIsLandscape(Dimensions.get("window").width > Dimensions.get("window").height);
    };
    Dimensions.addEventListener('change', dimensionChange);
    return () => {};
  }, []);

  const numColumns = isLandscape ? 1 : 2;

  const bottomNavbarItems = [
    { label: "Home", routeName: "LandP" },
    { label: "Display", routeName: "AppView" },
    { label: "Profile", routeName: "ProfileP" },
  ];

  const handlePress = (id: string) => {
    console.log("Pressed", id);
  };

  const roomData: CardDataItem[] = [
    { id: 'kitchen', title: 'Kitchen', isOn: true, onIcon: 'lightbulb-outline', offIcon: 'lightbulb' },
    { id: 'livinrm', title: 'Living Rm', isOn: true, onIcon: 'thermostat', offIcon: 'thermostat-auto' },
    { id: 'bedroom', title: 'Bedroom', isOn: true, onIcon: 'air', offIcon: 'ac-unit' },
    { id: 'comp_view', title: 'Compound View', isOn: true, onIcon: 'security', offIcon: 'security-update-warning' },
    { id: 'tvlivin', title: 'Tv Livin rm', isOn: true, onIcon: 'cleaning-services', offIcon: 'sensors-off' },
    { id: 'aob', title: 'Other', isOn: true, onIcon: 'add', offIcon: 'add-box' },
  ];

  const renderItem = ({ item }: { item: CardDataItem }) => (
    <CardIcon
      title={item.title}
      isOn={item.isOn}
      onIcon={item.onIcon}
      offIcon={item.offIcon}
      onPress={() => handlePress(item.id)}
    />
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent:'space-evenly',
    },
    content: {
      flex: 1,
      flexDirection: isLandscape ? 'row' : 'column',
      margin:'auto',
    },
    viewingArea: {
      flex: 1,
      maxWidth: isLandscape ? '60%' : '100%'
    },
    cardIcons: {
      flex: 1,
    },
    listContentContainer: {
      justifyContent:'center'
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.viewingArea}>
          <DbStatus rooms={roomData} onToggleRoomStatus={handlePress} />
        </View>
        <View style={styles.cardIcons}>
          <FlatList
            key={isLandscape ? 'landscape' : 'portrait'} // Change key when orientation changes
            data={roomData}
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

export default ViewArea;
