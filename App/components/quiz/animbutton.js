import React, { useState } from 'react';
import { useData } from './DataContext';
import { Text, TouchableWithoutFeedback } from 'react-native';
import * as Animatable from 'react-native-animatable';

export default function Animbutton(props) {

    const { setData, data } = useData()
    const _onPress = () => {
        props._onPress(true)
        setData(!data)
    }

    return (
        <TouchableWithoutFeedback onPress={() => _onPress()}>
            <Animatable.View style={{ margin: 10, paddingTop: 10, paddingBottom: 10, paddingRight: 20, paddingLeft: 20, backgroundColor: props.selectedAnswer === props.text ? props.onColor : "#bdbdbd", borderRadius: 20 }}>
                {props.selectedAnswer === props.text ? (
                    <Text style={{ color: "yellow", fontWeight: "bold" }}>{props.text}</Text>
                    ) : (
                    <Text style={{ color: "black", fontWeight: "bold" }}>{props.text}</Text>)
                }
            </Animatable.View>
        </TouchableWithoutFeedback>
    );
}