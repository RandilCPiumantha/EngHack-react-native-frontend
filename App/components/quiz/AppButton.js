import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native';

function AppButton({ title, onPress, style }) {
    return (
        <TouchableOpacity style={[styles.button, style]} onPress={onPress}>

            <Text style={[styles.text, style]}>{title}</Text>

        </TouchableOpacity>

    );
}
const styles = StyleSheet.create({
    button: {
        backgroundColor: "dodgerblue",
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 15,
        width: '100%'
    },
    text: {
        color: "white",
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    }
})

export default AppButton;