import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import colors from './color';
import AppText from './AppText';


function Card({description}) {
    return (
        <View style = {styles.card}>
            <View style = {styles.detailsContainer}>
                <AppText style = {styles.description}>{description}</AppText>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    
    card:{
        borderRadius:15,
        backgroundColor:colors.white,
        marginBottom:20,
        overflow:"hidden"
    },
    
    detailsContainer:{
        padding:20,
    },

    description:{
        marginBottom:7
    },

})

export default Card;