import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const Splash = () => {
	return(
		<View style={styles.container}>
			<Image style={styles.stretch} source={require('../../assets/splash.png')} />
			<Text style={styles.loadingText} >EngHack</Text>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	loadingText: {
		color: '#2979FF',
		fontSize: 30,
		fontWeight: 'bold',
		marginTop:-100
	},
	stretch: {
		width: 300,
		height: 300,
		marginTop:500
	}
});

export default React.memo(Splash);