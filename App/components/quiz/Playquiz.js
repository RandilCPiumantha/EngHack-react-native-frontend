import React, { Component, useState } from 'react';
import QuizFunc from './QuizFunc';
import { DataProvider } from './DataContext';
import { StyleSheet, StatusBar, TouchableOpacity, View, Text, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import AppButton from './AppButton';
import AnswerList from './AnswerList';

const jsonData = {
    "quiz": {
        "question1": {
            "correctoption": "option3",
            "options": {
                "option1": "is finished",
                "option2": "was finished",
                "option3": "had finished",
                "option4": "not finished"
            },
            "question": " He told me that he ____ watching the movie."
        },
        "question2": {
            "correctoption": "option3",
            "options": {
                "option1": "so",
                "option2": "very",
                "option3": "too",
                "option4": "more"
            },
            "question": " I do my work _____ carefully not to make mistakes."
        },
        "question3": {
            "correctoption": "option1",
            "options": {
                "option1": "because of",
                "option2": "because off",
                "option3": "on",
                "option4": "for"
            },

            "question": "He got too tired _____ over work."
        },
        "question4": {
            "correctoption": "option3",
            "options": {
                "option1": "muteble",
                "option2": "imutable",
                "option3": "variable",
                "option4": "none of the above"
            },
            "question": "Find the word with correct spelings"
        },
        "question5": {
            "correctoption": "option1",
            "options": {
                "option1": "modern",
                "option2": "old",
                "option3": "regular",
                "option4": "ancient"
            },
            "question": "Select the similar word for 'new'"
        },
        "question6": {
            "correctoption": "option3",
            "options": {
                "option1": " Greedy",
                "option2": "Very Hungry",
                "option3": "Assuaged",
                "option4": "None of these"
            },

            "question": "Antonym of Ravenous ?"
        },
        "question7": {
            "correctoption": "option2",
            "options": {
                "option1": "sitting",
                "option2": " has been sitting",
                "option3": "has been sit",
                "option4": "has sit"
            },

            "question": "She ____ in the sun for 1 hour."
        },
        "question8": {
            "correctoption": "option2",
            "options": {
                "option1": "Symphonious",
                "option2": "Homophonous",
                "option3": "Synonyms",
                "option4": "Saminymous"
            },
            "question": " Sounding the same but spelt differently ?"
        },
        "question9": {
            "correctoption": "option1",
            "options": {
                "option1": "My friend has got a new job.",
                "option2": "My friend has got a new work.",
                "option3": "My friend is got a new job.",
                "option4": "My friend did got a new job."
            },

            "question": "Choose the correct answer ?"
        },
        "question10": {
            "correctoption": "option2",
            "options": {
                "option1": " Do you like a glass of water ?",
                "option2": "Would you like a glass of water ?",
                "option3": "Would you like the glass of water ?",
                "option4": "Do you like the glass of water ?"
            },

            "question": "Choose the correct sentence."
        },
    }
}
export default function Playquiz(props) {
    
    const jdata = jsonData.quiz

    const [state, setState] = useState({
        quizFinish: false,
        score: 0,
        next: false
    })

    const _quizFinish = (score) => {
        setState({ quizFinish: true, score: score })
    }

    const _onPressBack = () => {
        const { goBack } = props.navigation
        goBack()
    }

    const _scoreMessage = (score) => {
        if (score <= 30) {
            return (
                <View style={styles.innerContainer} >
                    <View style={{ flexDirection: "row" }} >
                        <Icon name="trophy" size={30} color="white" />
                    </View>
                    <Text style={styles.score}>You need to work hard</Text>
                    <Text style={styles.score}>You scored {score}%</Text>
                </View>
            );
        } else if (score > 30 && score < 60) {
            return (
                <View style={styles.innerContainer} >
                    <View style={{ flexDirection: "row" }} >
                        <Icon name="trophy" size={30} color="white" />
                        <Icon name="trophy" size={30} color="white" />
                    </View>
                    <Text style={styles.score}>You are good</Text>
                    <Text style={styles.score}>Congrats you scored {score}% </Text>
                </View>
            );
        } else if (score >= 60) {
            return (
                <View style={styles.innerContainer}>
                    <View style={{ flexDirection: "row" }} >
                        <Icon name="trophy" size={30} color="white" />
                        <Icon name="trophy" size={30} color="white" />
                        <Icon name="trophy" size={30} color="white" />
                    </View>
                    <Text style={styles.score}>Great job</Text>
                    <Text style={styles.score}>Congrats you scored {score}% </Text>
                </View>
            );
        }
    }

    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle="light-content" />
            { state.quizFinish ? <View style={styles.container}>
                <View style={styles.circle}>
                    {_scoreMessage(state.score)}
                </View>
                <AppButton title="Click here to see the answer list" onPress={() => setState({ next: true })} />
            </View> :
                state.next ? <React.Fragment><AnswerList navigation={props.navigation} jdata={jdata} /></React.Fragment>
                    :
                <React.Fragment><DataProvider><QuizFunc quizFinish={(score) => _quizFinish(score)} jdata={jdata} /></DataProvider></React.Fragment>}
        </View>
    );
}

const scoreCircleSize = 300

const styles = StyleSheet.create({
    score: {
        color: "white",
        fontSize: 20,
        fontStyle: 'italic'
    },
    circle: {
        justifyContent: 'center',
        alignItems: 'center',
        width: scoreCircleSize,
        height: scoreCircleSize,
        borderRadius: scoreCircleSize / 2,
        backgroundColor: "dodgerblue",
        marginBottom: 100
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    toolbar: {
        backgroundColor: '#81c04d',
        paddingTop: 30,
        paddingBottom: 10,
        flexDirection: 'row'
    },
    toolbarButton: {
        width: 55,
        color: '#fff',
        textAlign: 'center'
    },
    toolbarTitle: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: 'bold',
        flex: 1
    }
});