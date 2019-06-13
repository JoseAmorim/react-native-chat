import React from 'react';
import {
    View,
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    } from 'react-native';

import firebase from 'firebase';
import User from '../src/User';

export default class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props);
        this._bootstrapAsync();
    }

    componentDidMount() {
        // Your web app's Firebase configuration
        var firebaseConfig = {
            apiKey: "AIzaSyBA3wkJXO2OWkkZnBvNhlIWCQakIOC5RrQ",
            authDomain: "fir-chat-b5c0e.firebaseapp.com",
            databaseURL: "https://fir-chat-b5c0e.firebaseio.com",
            projectId: "fir-chat-b5c0e",
            storageBucket: "fir-chat-b5c0e.appspot.com",
            messagingSenderId: "1079886226123",
            appId: "1:1079886226123:web:805b3cb8f1723839"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
    }

    _bootstrapAsync = async () => {
        User.phone = await AsyncStorage.getItem('userPhone');

        this.props.navigation.navigate(User.phone ? 'App' : 'Auth');
    };

    render() {
        return (
            <View>
                <ActivityIndicator/>
                <StatusBar barStyle="default"/>
            </View>
        );
    }
}
