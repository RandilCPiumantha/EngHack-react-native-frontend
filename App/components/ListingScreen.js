import React from 'react';
import { FlatList , StyleSheet } from 'react-native';

import Screen from './Screen';
import Card from './Card';
import color from './color';


//need get from db
const listings = [
    {
        id:'1',
        description:'English texts for beginners to practice reading and comprehension online and for free. Practicing your comprehension of written English will both improve your vocabulary and understanding of grammar and word order. The texts below are designed to help you develop while giving you an instant evaluation of your progress.',

    },

    {
        id:'2',
        description:'Prepared by experienced English teachers, the texts, articles and conversations are brief and appropriate to your level of proficiency. Take the multiple-choice quiz following each text, and you ll get the results immediately.',

    },

    {
        id:'3',
        description:'Prepared by experienced English teachers, the texts, articles and conversations are brief and appropriate to your level of proficiency. Take the multiple-choice quiz following each text, and you ll get the results immediately.',

    },

    {
        id:'4',
        description:'Prepared by experienced English teachers, the texts, articles and conversations are brief and appropriate to your level of proficiency. Take the multiple-choice quiz following each text, and you ll get the results immediately.',

    },

    {
        id:'5',
        description:'Prepared by experienced English teachers, the texts, articles and conversations are brief and appropriate to your level of proficiency. Take the multiple-choice quiz following each text, and you ll get the results immediately.',

    },

    {
        id:'6',
        description:'Prepared by experienced English teachers, the texts, articles and conversations are brief and appropriate to your level of proficiency. Take the multiple-choice quiz following each text, and you ll get the results immediately.',

    },

    {
        id:'7',
        description:'Prepared by experienced English teachers, the texts, articles and conversations are brief and appropriate to your level of proficiency. Take the multiple-choice quiz following each text, and you ll get the results immediately.',

    },

    
]


function ListingScreen(props) {

    return (
       <Screen style = {styles.screen}>
           <FlatList
                data = {listings}
                keyExtractor = {(listing) =>listing.id.toString()}
                renderItem = {({item}) => 
                    <Card 
                        description = {item.description}
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