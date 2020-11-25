import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'

// Loading indicator view
export const Loading = () => {
    return(
        <View style={styles.loadingView} >
            <ActivityIndicator size="large" color="#2979FF" />
            <Text style={styles.loadingText} >Loading . . .</Text>
        </View>
    );
};

// Styles
const styles = StyleSheet.create({
    loadingView: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    loadingText: {
        color: '#2979FF',
        fontSize: 14,
        fontWeight: 'bold'
    }
});