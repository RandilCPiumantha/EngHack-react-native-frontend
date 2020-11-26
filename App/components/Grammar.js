import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Text, View } from 'react-native';
import PlayQuiz from './quiz/Playquiz';

import { Loading } from './Loading';

export default function Grammar({ navigation }) {

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
			<PlayQuiz navigation={navigation} />
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