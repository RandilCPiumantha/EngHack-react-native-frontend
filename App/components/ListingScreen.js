import React from 'react';
import { FlatList , StyleSheet } from 'react-native';

import Screen from '../components/Screen';
import Card from './Card';
import color from './color';

const listings = [
    {
        id:'1',
        title:'Reding leasons 1',
        description:'English for Everyone is a smart, simple new way to teach yourself the English language. This highly visual course uses graphics and pictures instead of wordy explanations, making vocab and grammar easy to remember. ',
        image:require('../../assets/new_dev_signup.jpg')

    },

    {
        id:'2',
        title:'Reading leasons 2',
        description:'English for Everyone is a smart, simple new way to teach yourself the English language. This highly visual course uses graphics and pictures instead of wordy explanations, making vocab and grammar easy to remember. ',
        image:require('../../assets/dev_students.png')

    },

    {
        id:'3',
        title:'Reading leasons 3',
        description:'English for Everyone is a smart, simple new way to teach yourself the English language. This highly visual course uses graphics and pictures instead of wordy explanations, making vocab and grammar easy to remember. ',
        image:require('../../assets/abus.png')

    }
]


function ListingScreen(props) {

    return (
       <Screen style = {styles.screen}>
           <FlatList
                data = {listings}
                keyExtractor = {(listing) =>listing.id.toString()}
                renderItem = {({item}) => 
                    <Card 
                        title = {item.title}
                        description = {item.description}
                        image = {item.image}
                        icon = {item.icon}
                        />
                    }
           />
       </Screen>
    );
}

const styles = StyleSheet.create({
    
    screen:{
        padding:20,
        backgroundColor:color.light
    }

 })

export default ListingScreen;