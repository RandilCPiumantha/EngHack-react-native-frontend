import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { AuthContext } from "./context";

export default function Login() {

	var name = "dasith"
	const { signIn } = React.useContext(AuthContext);

	useEffect(() => {
		setTimeout(() => {
			signIn(name);
		}, 1500);
	}, []);

	return (
		<View style={styles.container}>
			<Text>Login screen!</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});