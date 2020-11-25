import React, { useContext, useState, useEffect } from "react";
import { StyleSheet, Text, View } from 'react-native';

import { AuthContext } from "./context";
import ChatClass from './ChatClass';
import { Loading } from './Loading';

export default function Chat() {

	const { name } = useContext(AuthContext);
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
			<Text>{name}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});