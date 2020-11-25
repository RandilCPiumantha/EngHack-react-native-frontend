import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Text, View } from 'react-native';

import { Loading } from './Loading';

import { AuthContext } from "./context";

export default function Login() {

	var name = "dasith"
	const { signIn } = React.useContext(AuthContext);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, 1500);
	}, []);

	useEffect(() => {
		setTimeout(() => {
			signIn(name);
		}, 3000);
	}, []);

	if (isLoading) {
		return <Loading />;
	}

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