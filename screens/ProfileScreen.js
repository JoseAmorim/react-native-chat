import React from 'react';
import { SafeAreaView, Alert, AsyncStorage, Text, TextInput, TouchableOpacity } from 'react-native';
import User from '../src/User';
import styles from '../constants/styles';
import firebase from 'firebase';

export default class ProfileScreen extends React.Component {
    static navigationOptions = {
        title: 'Perfil'
    }

    state = {
        name: User.name
    }

    handleChange = key => val => {
        this.setState({[key]: val});
    }

    _logOut = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    }

    changeName = async () => {
        if(this.state.name.length < 3) {
            Alert.alert('Erro', 'Digite um nome válido.');
        } else if(User.name !== this.state.name) {   
            firebase.database().ref('users').child(User.phone).set({name: this.state.name});
            User.name = this.state.name;
            Alert.alert('Sucesso', 'Nome alterado com sucesso.');
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={{fontSize: 20}}>
                    {User.phone}
                </Text>
                <TextInput
                    style={styles.input}
                    value={this.state.name}
                    onChangeText={this.handleChange('name')}
                />
                <TouchableOpacity onPress={this.changeName}>
                    <Text style={styles.btnText}>Mudar Nome</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this._logOut}>
                    <Text style={styles.btnText}>Deslogar</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }
}
