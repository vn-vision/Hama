import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CardIcon from "./CardIcon";

const ViewArea = () => {
    const handlePress = (id: string) => {
        console.log('Pressed', id);
    };

    return(
    <SafeAreaView>
        <View style = {styles.screenVw}>
            <View style = {styles.display}>

            </View>
            <View style = {styles.dispIcons}>

            </View>
        </View>
        <View style = {styles.room}>
            <CardIcon title="Kitchen" isOn={true} onIcon='lightbulb' offIcon="" onPress={() => handlePress} containerWidth={24}/>
        </View>
    </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    screenVw: {
        flex:1,
        flexDirection:'row',
    },
    display: {
        padding: 20,
        alignItems: 'center',
        justifyContent: 'center',
        objectFit: 'cover',
    },
    dispIcons: {
        padding: 20,
        alignItems: 'center',
        justifyContent: "flex-end",
    },
    room: {
        paddingHorizontal: 5,
        paddingTop: 20,
        justifyContent: 'space-between',
    },
});
export default ViewArea;