import React from 'react';
import { StyleSheet, View, Pressable, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface CardProps {
  title: string;
  isOn: boolean;
  onIcon: string; // Icon name for on state
  offIcon: string; // Icon name for off state
  onPress: () => void;
  style?: object; // for more specific types of styles
}

const CardIcon = ({ title, isOn, onIcon, offIcon, onPress, style, }: CardProps) => {
  return (
    <Pressable style={[styles.pressableContainer, style]} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Icon name={isOn ? onIcon : offIcon} size={24} style={styles.icon} />
      </View>
      <View style={styles.titleContainer}>       
      <Text style={styles.title}>{title}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressableContainer: {
    backgroundColor: '#fff',
    padding: 20,
    margin: '1%',
    minWidth:'48%',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // space between icons and title
    elevation: 3, // for shadow (Android)
    shadowColor: '#000', // for shadow (iOS)
    shadowOffset: { width: 0, height: 2 }, // for shadow (iOS)
    shadowOpacity: 0.25, // for shadow (iOS)
    shadowRadius: 3.84, // for shadow (iOS)
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight:10,
  },
  title: {
    fontSize: 18,
  },
  titleContainer: {
    flex:2,
  },
});

export default CardIcon;