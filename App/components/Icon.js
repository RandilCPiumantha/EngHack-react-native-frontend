import React from 'react';
import { View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import AppText from './AppText';

function Icon(props) {
    return (
        <View style = {{

            justifyContent:"flex-end",
            alignItems:"flex-end"
        }}>
           <Entypo name="eye" size={24} color="black" />
           <AppText>10</AppText>
        </View>
    );
}

export default Icon;