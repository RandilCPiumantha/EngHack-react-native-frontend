import React, { useContext, useState, useEffect } from "react";
import { StyleSheet} from 'react-native';

import { Loading } from './Loading';
import ListingScreen from './ListingScreen';

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
		<ListingScreen/>
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