import React from 'react';
import { View, Pressable, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';

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

export default CardIcon;