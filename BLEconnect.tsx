import { useState } from "react";
import { PermissionsAndroid, Platform } from "react-native";
import { BleManager, Device } from 'react-native-ble-plx'
import DeviceInfo from "react-native-device-info";
import { PERMISSIONS, requestMultiple } from "react-native-permissions";

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
            const apiLevel = await DeviceInfo.getApiLevel();
            if (apiLevel < 31 ){
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
            else
            {
                const result = await requestMultiple([
                    PERMISSIONS.ANDROID.BLUETOOTH_SCAN,
                    PERMISSIONS.ANDROID.BLUETOOTH_CONNECT,
                    PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
                    PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
                ]);

                const allGrantedStatus = result['android.permission.BLUETOOTH_SCAN'] === PermissionsAndroid.RESULTS.GRANTED &&
                result['android.permission.BLUETOOTH_CONNECT'] === PermissionsAndroid.RESULTS.GRANTED &&
                result['android.permission.ACCESS_FINE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED &&
                result['android.permission.ACCESS_COARSE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED;


                callback(allGrantedStatus)
            }
        } 
        else
        {
            callback(true);
        }
    };

        // enable bluetooth connection
        const enableBluetooth = async () => {
            try {
                const state = await bleManager.state();
                if (state === "PoweredOff") {
                    await bleManager.enable();
                }
            } catch (error) {
                console.error("Failed to enable Bluetooth:", error);
            }
        };
        
        // scan for devices
        const scanForDevices = async () => {
            try {
                await enableBluetooth();
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
            }
                catch(error){
                    console.error("Failed to start Scan for devices", error);
                }
        };

        const duplicateDevice = (devices: Device[], nextDevice: Device) => 
            devices.findIndex(device => nextDevice.id === device.id) > -1;
        

    return {requestPermission,
        scanForDevices,
         allDevices};
}