import React, { Component, useState } from 'react';
import Quiz from './Quiz';
import { useData } from './DataContext';

export default function QuizFunc(props) {

    const { setData, data } = useData();

    const _quizFinish = (score) => {
        props.quizFinish(score)
    }

    const _onPress = () => {
        setData(false)
    }
    return (
        <Quiz set={() => _onPress()} quizFinish={(score) => _quizFinish(score)} {...props} jdata={props.jdata} />
    );
}