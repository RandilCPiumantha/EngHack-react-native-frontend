import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, ScrollView, Image, Text, KeyboardAvoidingView } from "react-native";
import { Icon, Input, Button } from 'react-native-elements';

import { AuthContext } from "./context";
import { Loading } from './Loading';

const ScreenContainer = ({ children }) => (
  	<View style={styles.container}>{children}</View>
);

export default function Register ({ navigation }) {

	const { signIn } = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState(true);
	const [enableShift, setEnableShift] = useState(false);

	const [username, setUsername] = useState();
	const [newPassword, setPassword] = useState();
	const [confirmPassword, setConfirmPassword] = useState();
	const [name, setName] = useState();
	const [nic, setNic] = useState();
	const [address, setAddress] = useState();
	const [phone, setPhone] = useState();
	const [email, setEmail] = useState();

	const validate = () => {
		if(!username || !newPassword || !confirmPassword || !name || !nic || !address || !phone || !email) {
			alert("All fields are required!");
		} else if((phone.length != 10)) {
			alert("Invalid Phone No.!");
		} else if(newPassword !== confirmPassword) {
            alert("Confirm password does not match!");
		} else if((newPassword.length < 10) || (confirmPassword.length < 10)) {
			alert("Password need to be at least 10 digits!");
		} else if (!/[!@#$%^&*]/.test(newPassword)) {
			alert("Password must have at least one special character! Eg: !,@,#,$,%,^,&,*");
		} else {
			signIn(username,newPassword);
		}
	}

	useEffect(() => {
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
				<KeyboardAvoidingView behavior="position" enabled={enableShift}>
					<View style={styles.logoView}>
						<Image style={styles.stretch} source={require('../../assets/splash.png')} />
						<Text style={styles.text}>Create Account</Text>
					</View>
					<View style={styles.container}>
						<Input
							placeholder="Name"
							leftIcon={{ type: 'font-awesome', name: 'address-book-o' }}
							onChangeText={(name) => setName(name)}
							value={name}
							containerStyle={styles.formInput}
							onFocus={() => {setEnableShift(false)}}
						/>
						<Input
							placeholder="Username"
							leftIcon={{ type: 'font-awesome', name: 'user-o' }}
							onChangeText={(username) => setUsername(username)}
							value={username}
							containerStyle={styles.formInput}
							onFocus={() => {setEnableShift(false)}}
						/>
						<Input
							placeholder="NIC"
							leftIcon={{ type: 'font-awesome', name: 'id-card-o' }}
							onChangeText={(nic) => setNic(nic)}
							value={nic}
							containerStyle={styles.formInput}
							onFocus={() => {setEnableShift(false)}}
						/>
						<Input
							placeholder="Address"
							leftIcon={{ type: 'font-awesome', name: 'address-card-o' }}
							onChangeText={(address) => setAddress(address)}
							value={address}
							containerStyle={styles.formInput}
							onFocus={() => {setEnableShift(false)}}
						/>
						<Input
							placeholder="Phone"
							leftIcon={{ type: 'font-awesome', name: 'phone' }}
							onChangeText={(phone) => setPhone(phone)}
							value={phone}
							containerStyle={styles.formInput}
							onFocus={() => {setEnableShift(false)}}
						/>
						<Input
							placeholder="Email"
							leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
							onChangeText={(email) => setEmail(email)}
							value={email}
							containerStyle={styles.formInput}
							onFocus={() => {setEnableShift(true)}}
						/>
						
						<Input
							placeholder="New Password"
							leftIcon={{ type: 'font-awesome', name: 'key' }}
							onChangeText={(newPassword) => setPassword(newPassword)}
							value={newPassword}
							containerStyle={styles.formInput}
							secureTextEntry={true}
							onFocus={() => {setEnableShift(true)}}
						/>
						<Input
							placeholder="Confirm Password"
							leftIcon={{ type: 'font-awesome', name: 'key' }}
							onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
							value={confirmPassword}
							containerStyle={styles.formInput}
							secureTextEntry={true}
							onFocus={() => {setEnableShift(true)}}
						/>
						<View style={styles.formButton}>
							<Button
								title=" Register"
								onPress={() => validate()}
								icon={ <Icon name='user-plus' type='font-awesome' size={24} color= 'white' />}
								buttonStyle={{ backgroundColor: "#2979FF" }}
							/>
						</View>
					</View>
				</KeyboardAvoidingView>
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
		marginTop:20
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