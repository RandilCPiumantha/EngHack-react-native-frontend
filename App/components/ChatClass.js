import React, { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import Fire from './Fire';

export default class ChatClass extends Component {

    state = {
        messages: []
    };

    get user() {
        return {
            name: this.props.name,
            _id: Fire.shared.uid,
        };
    }

    componentDidMount() {
        // loading messages from the backend
        Fire.shared.on(message =>
            this.setState(previousState => ({
                messages: GiftedChat.append(previousState.messages, message),
            }))
        );
    }

    componentWillUnmount() {
        Fire.shared.off();
    }

    render() {
        return (
            <GiftedChat
                messages={this.state.messages}
                onSend={Fire.shared.send}
                user={this.user}
            />
        );
    }
}