import React, { Component } from 'react';
import { DataProvider } from './DataContext';
import { AppRegistry, StyleSheet, Text, View, Button, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Animbutton from './animbutton'
const { width, height } = Dimensions.get('window')
let arrnew = []

export default class Quiz extends Component {
    constructor(props) {
        super(props);
        this.qno = 0
        this.score = 0

        const jdata = props.jdata
        arrnew = Object.keys(jdata).map(function (k) { return jdata[k] });

        this.state = {
            question: arrnew[this.qno].question,
            options: arrnew[this.qno].options,
            correctoption: arrnew[this.qno].correctoption,
            countCheck: 0,
            active: 0,
            selectedAnswer: "undefined"
        }
    }

    prev() {
        if (this.qno > 0) {
            this.qno--
            this.setState({ active: 0, countCheck: 0, question: arrnew[this.qno].question, options: arrnew[this.qno].options, correctoption: arrnew[this.qno].correctoption })
        }
    }

    next() {
        this.setState({ active: 0, selectedAnswer: "undefined" })
        if (this.qno < arrnew.length - 1) {
            this.qno++
            this.setState({ active: 0, countCheck: 0, question: arrnew[this.qno].question, options: arrnew[this.qno].options, correctoption: arrnew[this.qno].correctoption })
        } else {
            this.props.quizFinish(this.score * 100 / 10)
        }
    }

    _answer(status, ans) {
        if (status == true) {
            const count = this.state.countCheck + 1
            this.setState({ countCheck: count, active: 1 })
            if (ans == this.state.correctoption) {
                this.score += 1
            }
        } else {
            const count = this.state.countCheck - 1
            this.setState({ countCheck: count })
            if (this.state.countCheck < 1 || ans == this.state.correctoption) {
                this.score -= 1
            }
        }
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
                        <View style={styles.oval} >
                            <Text style={styles.welcome}>
                                {this.state.question}
                            </Text>
                        </View>
                        <View>
                            {options}
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <TouchableOpacity onPress={() => this.prev()} >
                                <View style={{ paddingTop: 5, paddingBottom: 5, paddingRight: 20, paddingLeft: 20, borderRadius: 10, backgroundColor: "dodgerblue", margin:5 }}>
                                    <Icon name="md-arrow-round-back" size={30} color="white" />
                                </View>
                            </TouchableOpacity >
                            <TouchableOpacity onPress={() => this.next()} >
                                <View style={{ paddingTop: 5, paddingBottom: 5, paddingRight: 20, paddingLeft: 20, borderRadius: 10, backgroundColor: "dodgerblue", margin:5 }}>
                                    <Icon name="md-arrow-round-forward" size={30} color="white" />
                                </View>
                            </TouchableOpacity >
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    oval: {
        width: width * 90 / 100,
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
        color: "white"
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});