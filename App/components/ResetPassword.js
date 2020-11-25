import React, { useState, useContext, useCallback, useEffect } from "react";
import { View, StyleSheet, ScrollView, Image, Text, KeyboardAvoidingView, Alert } from "react-native";
import { Icon, Input, Button } from 'react-native-elements';
import axios from 'axios';

import { baseURL } from './baseURL';
import { AuthContext } from "./context";
import { Loading } from './Loading';

const ScreenContainer = ({ children }) => (
	<View style={styles.container}>{children}</View>
);

export default function ResetPassword() {

	const { signOut, username, password, userJWT, removeDetails } = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState(true);
	const [currentPassword, setCurrentPassword] = useState();
    const [newPassword, setNewPassword] = useState();
	const [confirmPassword, setConfirmPassword] = useState();
	const [enableShift, setEnableShift] = useState(false);

	const validate = useCallback(() => {
		const loggedInPW = password;
        
        if(!currentPassword) {
            alert("Current Password cannot be empty!");
        } else if(!newPassword || !confirmPassword) {
            alert("New Password or Confirm Password cannot be empty!");
        } else if(newPassword !== confirmPassword) {
            alert("Confirm password does not match!");
		} else if(newPassword === currentPassword) {
			alert("Current Password and New Password cannot be the same!");
		} else if(loggedInPW !== currentPassword) {
			alert("Current password does not match!!");
		} else if((newPassword.length < 10) || (confirmPassword.length < 10)) {
			alert("Password need to be at least 10 digits!");
		} else if (!/[!@#$%^&*]/.test(newPassword)) {
			alert("Password must have at least one special character! Eg: !,@,#,$,%,^,&,*");
		} else {
			const user = {
				username: username,
				currentPassword: currentPassword,
				newPassword: newPassword,
				confirmPassword: confirmPassword
			};
			axios.post(`${baseURL}/users/reset`, user, { headers: { "x-auth-token": userJWT } })
			.then((res) => {
				console.log(res.data);
				Alert.alert(
					"Success",
					"Password changed successfully! You must sign in again to continue!",
					[
						{
							text: 'OK',
							style: 'cancel',
							onPress: () => {
								signOut();
								removeDetails();
							}
						}
					],
					{ cancelable: false }
				);
			})
			.catch((err) => {
				Alert.alert("Error",`Password change failed! ${err.response.data.msg}`);
			});
        }
    },[username, currentPassword, newPassword, confirmPassword]);

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
						<Text style={styles.text}>Reset Password</Text>
					</View>
					<View style={styles.container}>
						<View>
							<Input
								placeholder="Current Password"
								secureTextEntry={true}
								leftIcon={{ type: 'font-awesome', name: 'user-o' }}
								onChangeText={(currentPassword) => setCurrentPassword(currentPassword)}
								value={currentPassword}
								onFocus={() => {setEnableShift(true)}}
								containerStyle={styles.formInput}
							/>
							<Input
								placeholder="New Password"
								secureTextEntry={true}
								leftIcon={{ type: 'font-awesome', name: 'key' }}
								onChangeText={(newPassword) => setNewPassword(newPassword)}
								value={newPassword}
								onFocus={() => {setEnableShift(true)}}
								containerStyle={styles.formInput}
							/>
							<Input
								placeholder="Confirm Password"
								secureTextEntry={true}
								leftIcon={{ type: 'font-awesome', name: 'key' }}
								onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)}
								value={confirmPassword}
								onFocus={() => {setEnableShift(true)}}
								containerStyle={styles.formInput}
							/>
						</View>
						<View style={styles.formButton}>
							<Button
								title=" Reset Password"
								onPress={() => validate()}
								icon={ <Icon name='lock' type='font-awesome' size={24} color= 'white' />}
								buttonStyle={{ backgroundColor: "#2979FF" }}
							/>
						</View>
					</View>
				</KeyboardAvoidingView>
            </ScrollView>
		</ScreenContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		marginLeft: 10,
		marginRight: 10
	},
	logoView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
    formInput: {
    },
    formCheckbox: {
        margin: 20,
        backgroundColor: null
    },
    formButton: {
		marginBottom: 20,
		marginTop: 20,
		marginLeft: 75,
		marginRight: 75
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