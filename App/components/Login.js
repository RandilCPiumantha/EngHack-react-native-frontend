import React, { useState, useContext, useEffect, useCallback } from "react";
import { View, StyleSheet, ScrollView, Image, Text } from "react-native";
import { Icon, Input, Button, CheckBox } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';

import { AuthContext } from "./context";
import { Loading } from './Loading';

const ScreenContainer = ({ children }) => (
  	<View style={styles.container}>{children}</View>
);

export default function Login ({ navigation }) {

	const { signIn } = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState(true);
	const [username, setUsername] = useState();
	const [password, setPassword] = useState();
	const [remember, setRemember] = useState(false);

	const validate = () => {
		if(!username || !password) {
			alert("Username or Password cannot be empty!");
		} else {
			signIn(username,password);
			if (remember) {
				save();
			}
		}
	}

	const save = useCallback(async () => {
		try {
			await SecureStore.setItemAsync("username", username);
			await SecureStore.setItemAsync("password", password);
		} catch (err) {
			alert (err);
		}
	});

	const load = useCallback(async () => {
		try {
			let username = await SecureStore.getItemAsync("username");
			let password = await SecureStore.getItemAsync("password");

			if (username !== null && password !== null) {
				setUsername(username);
				setPassword(password);
			}
		} catch (err) {
			alert (err);
		}
	});

	useEffect(() => {
		load();
		setTimeout(() => {
			setIsLoading(false);
		}, 1500);
	}, []);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<ScreenContainer>
			<ScrollView>
				<View style={styles.logoView}>
					<Image style={styles.stretch} source={require('../../assets/splash.png')} />
					<Text style={styles.text}>Welcome {username}</Text>
				</View>
				<View style={styles.container}>
					<Input
						placeholder="Username"
						leftIcon={{ type: 'font-awesome', name: 'user-o' }}
						onChangeText={(username) => setUsername(username)}
						value={username}
						containerStyle={styles.formInput}
					/>
					<Input
						placeholder="Password"
						leftIcon={{ type: 'font-awesome', name: 'key' }}
						onChangeText={(password) => setPassword(password)}
						value={password}
						containerStyle={styles.formInput}
						secureTextEntry={true}
					/>
					<CheckBox title="Remember Me"
						center
						checked={remember}
						onPress={() => {setRemember(!remember)}}
						containerStyle={styles.formCheckbox}
					/>
					<View style={styles.formButton}>
						<Button
							title=" Sign In"
							onPress={() => validate()}
							icon={ <Icon name='sign-in' type='font-awesome' size={24} color= 'white' />}
							buttonStyle={{ backgroundColor: "#2979FF" }}
						/>
					</View>
				</View>
            </ScrollView>
		</ScreenContainer>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		marginLeft: 10,
		marginRight: 10,
		marginTop:40
	},
	logoView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
    formInput: {
    },
    formButton: {
		marginBottom: 20,
		marginTop: 20,
		marginLeft: 75,
		marginRight: 75
	},
	formCheckbox: {
        margin: 10,
        backgroundColor: null
    },
	stretch: {
		width: 300,
		height: 100
	},
	text: {
		flex: 1,
		color: '#2979FF',
		fontSize: 25,
		fontWeight: 'bold'
	}
});