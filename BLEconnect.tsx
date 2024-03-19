import { useState } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import { BleManager, Device } from 'react-native-ble-plx'
type PermissionsCallBack = (result: boolean) => void;

// create BleManager Object
const bleManager = new BleManager();

interface BLEApi {
    requestPermission(callback: PermissionsCallBack): Promise<void>;
    scanForDevices(): void;
    allDevices: Device[];
}

export default function useBLE(): BLEApi {
    // state to hold all the different devices scanned
    const [allDevices, addDevices] = useState<Device[]>([]);

    const requestPermission = async (callback: PermissionsCallBack) => {
        if (Platform.OS === "android"){
            const grantedStatus = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Location Permission',
                    message: 'Bluetooth Low Energy Needs Location Permission',
                    buttonNegative: 'Cancel',
                    buttonNeutral: 'Maybe Later',
                    buttonPositive:'Ok',
                },
            );
            callback(grantedStatus === PermissionsAndroid.RESULTS.GRANTED);
        }
        else {
            callback(true);
        }
    };
        // scan for devices
        const scanForDevices = () => {
            bleManager.startDeviceScan(null, null, (error, device)=>{
                if (error){
                    console.log(error);
                }
                if (device && device.name?.includes('ac')){
                    // Add device
                    addDevices((prevState) => {
                        if (duplicateDevice(prevState, device)){
                            return [...prevState, device];
                        }
                        return prevState;
                    })
                }
            });
        };

        const duplicateDevice = (devices: Device[], nextDevice: Device) => 
            devices.findIndex(device => nextDevice.id === device.id) > -1;
        

    return {requestPermission,
        scanForDevices,
         allDevices};
}