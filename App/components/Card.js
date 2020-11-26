import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import colors from './color';
import AppText from './AppText';
import Icon from './Icon';


function Card({title,description,image}) {
    return (
        <View style = {styles.card}>
            <Image style = {styles.image} source = {image}/>
            <View style = {styles.detailsContainer}>
                <AppText style = {styles.title}>{title}</AppText>
                <AppText style = {styles.description}>{description}</AppText>
                <Icon/>
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
    
    image:{
        width:"100%",
        height:200
    },

    detailsContainer:{
        padding:20,
    },

    title:{
        marginBottom:7,
        fontWeight:"bold"

    },

    subTitle:{

        color:colors.secondary,
        
    }
})

export default Card;