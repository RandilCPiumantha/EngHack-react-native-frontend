import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Text, View } from 'react-native';

import { Loading } from './Loading';

export default function Reading() {

	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setIsLoading(false);
		}, 1500);
	}, []);

	if (isLoading) {
		return <Loading />;
	}
	
	return (
		<View style={styles.container}>
			<Text>Readng screen!</Text>
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