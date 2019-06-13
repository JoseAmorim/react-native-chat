import React from 'react';
import {Text, TouchableOpacity, AsyncStorage, Alert, TextInput, View} from 'react-native';
import firebase from 'firebase';
import User from '../src/User';
import styles from '../constants/styles';

export default class LoginScreen extends React.Component {
	static navigationOptions = {
		header: null
	}
	
	state = {
		phone: '',
		name: '',
	};
	
	handleChange = key => val => {
		this.setState({[key]: val});
	}

	submitForm = async () => {
		if(this.state.phone.length < 11) {
			Alert.alert('Erro', 'Número inválido.');
		} else if(this.state.name.length < 3) {
			Alert.alert('Erro', 'Nome inválido.');
		}
		
		await AsyncStorage.setItem('userPhone', this.state.phone);
		User.phone = this.state.phone;
		firebase.database().ref('users/' + User.phone).set({name: this.state.name});
        this.props.navigation.navigate('App');
	}

	render() {
		return (
			<View style={styles.container}>
				<TextInput
					placeholder="Número de celular"
					keyboardType="phone-pad"
					style={styles.input}
					value={this.state.phone}
					onChangeText={this.handleChange('phone')}/>
				<TextInput
					placeholder="Nome"
					style={styles.input}
					value={this.state.name}
					onChangeText={this.handleChange('name')}/>
				<TouchableOpacity onPress={this.submitForm}>
					<Text style={styles.btnText}>Entrar</Text>		
				</TouchableOpacity>	
			</View>
		);
	}
}
