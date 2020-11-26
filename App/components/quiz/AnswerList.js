import React, { Component } from 'react';
import { DataProvider } from './DataContext';
import { AppRegistry, StyleSheet, Text, View, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import { Icon, Input, Button, CheckBox } from 'react-native-elements';
import Animbutton from './animbutton'

const { width, height } = Dimensions.get('window')
let arrnew = []
let questionList = [];

export default class AnswerList extends Component {
    constructor(props) {
        super(props);
        this.qno = 0
        this.score = 0

        const jdata = this.props.jdata
        arrnew = Object.keys(jdata).map(function (k) { return jdata[k] });
        this.state = {
            question: arrnew[this.qno].question,
            options: arrnew[this.qno].options,
            correctoption: arrnew[this.qno].correctoption,
            countCheck: 0,
            active: 0,
            selectedAnswer: "undefined"

        }
        questionList = Object.keys(jdata).map(function (k) { return (jdata[k]) });
        correctOptionsList = Object.keys(jdata).map(function (k) { return (jdata[k].correctoption) });
        optionsList = Object.keys(jdata).map(function (k) { return (jdata[k].options) });
    }

    render() {
        let _this = this
        const currentOptions = this.state.options
        const options = Object.keys(currentOptions).map(function (k) {
            return (<View key={k} style={{ margin: 10 }}>
                <DataProvider>
                    <Animbutton
                        selectedAnswer={_this.state.selectedAnswer}
                        countCheck={_this.state.countCheck}
                        onColor={"dodgerblue"}
                        effect={"tada"}
                        _onPress={(status) => {
                            _this.setState({ selectedAnswer: currentOptions[k] });
                            setTimeout(() => {
                                _this._answer(status, k)
                            }, 50);
                        }}
                        text={currentOptions[k]}
                    />
                </DataProvider>
            </View>)
        });

        return (
            <ScrollView style={{ backgroundColor: '#F5FCFF', paddingTop: 10 }}>
                <View style={styles.container}>
                    <View style={{ flex: 1, flexDirection: 'column', justifyContent: "space-between", alignItems: 'center', }}>
                        {
                            questionList.map((item) =>
                                <React.Fragment key={item.question}>
                                    <Text style={styles.oval}> {item.question} </Text>
                                    <Text style={styles.welcome}>{item.options.option1}</Text>
                                    <Text style={styles.welcome}>{item.options.option2}</Text>
                                    <Text style={styles.welcome}>{item.options.option3}</Text>
                                    <Text style={styles.welcome}>{item.options.option4}</Text>
                                    <Text style={styles.answer}>Correct answer is {item.correctoption.match(/\d/g).join("")}</Text>
                                </React.Fragment>
                            )}
                    </View>
                    <View style={styles.homeButtonView}>
                        <Button
							title=" Back to Home"
							onPress={() => this.props.navigation.push("Grammar")}
							icon={ <Icon name='home' type='font-awesome' size={24} color= 'white' />}
							buttonStyle={{ backgroundColor: "#2979FF" }}
						/>
					</View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    oval: {
        width: width * 90 / 100,
        padding: 15,
        borderRadius: 20,
        backgroundColor: 'dodgerblue',
        fontSize: 18
    },
    list: {
        width: width * 90 / 100,
        padding: 15,
        borderRadius: 20,
        backgroundColor: 'dodgerblue'
    },
    container: {
        flex: 1,
        alignItems: 'center'
    },
    welcome: {
        fontSize: 20,
        margin: 15,
        color: "gray",
    },
    answer: {
        fontSize: 20,
        margin: 15,
        color: "green",
        backgroundColor: "yellow",
        padding: 10,
        borderRadius: 20,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    homeButtonView: {
		marginBottom: 40,
		marginTop: 20,
		marginLeft: 75,
		marginRight: 75
	},
});