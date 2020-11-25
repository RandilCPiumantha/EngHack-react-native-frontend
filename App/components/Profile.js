import React, { useState, useContext, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView, Linking, Platform, Image, Alert } from "react-native";
import { Button, Icon } from 'react-native-elements';
import { Title, Card } from 'react-native-paper';
import axios from 'axios';

import { baseURL } from './baseURL';
import { AuthContext } from "./context";
import { Loading } from './Loading';

const ScreenContainer = ({ children }) => (
	<View style={styles.container}>{children}</View>
);

export default function Profile({ navigation }) {

	const { signOut, username, password, userJWT, removeDetails } = useContext(AuthContext);

	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState('');
	const [post, setPost] = useState({});

	const openMobile = useCallback(()=>{
    	if(Platform.OS === "android") {
        	Linking.openURL(`tel:${post.mobile}`)
        } else {
        	Linking.openURL(`telprompt:${post.mobile}`)
        }
	},[post.mobile]);

	const confirmSignOut = () => {
        Alert.alert(
            'Confirm Logout',
			'Are you sure you want to logout?',
            [
                {
                    text: 'Cancel',
                    style: 'cancel'
                },
                {
                    text: 'OK',
                    onPress: () => {
						signOut();
						removeDetails();
                    }
                }
            ],
            { cancelable: false }
        );
    }

	useEffect(() => {
		const user = {
			username: username,
			password: password
		};
		axios.post(`${baseURL}/users`, user, { headers: { "x-auth-token": userJWT } })
		.then((response) => {
			setIsLoading(false);
			setPost(response.data);
			setError('');
		})
		.catch((err) => {
			setIsLoading(false);
			setPost({});
			setError(`Error - ${err}! Reload the App. If it doesn't work, you need to Sign In again!`);
		});
	}, []);

	if (isLoading) {
		return <Loading />;
	}

	if (error) {
		return (
			<ScrollView>
				<Text>
					{error}
				</Text>
			</ScrollView>
		);
	}
	
	return (
		<ScreenContainer>
			<ScrollView>
				<View style={{alignItems:"center",margin:20}}>
					<Image
						style={{width:140,height:140,borderRadius:140/2}}
						source={require(`../../assets/faceavatar.png`)}
					/>
					<Title style={styles.profileTitle}>{post.name}</Title>
					<Text style={styles.profileClinicID}>{username}</Text>
				</View>
				<View style={styles.container}>
					<Card style={styles.mycard}>
						<View style={styles.cardContent}>
							<Icon name="id-card-o" type='font-awesome' size={23} color="#2979FF" />
							<Text style={styles.mytext}>{post.nic}</Text>
						</View>
					</Card>
					<Card style={styles.mycard} onPress={()=>openMobile()}>
						<View style={styles.cardContent}>
							<Icon name="mobile" type='font-awesome' size={40} color="#2979FF" />
							<Text style={styles.mytextMobile}>{post.mobile}</Text>
						</View>
					</Card>
					<Card
						style={styles.mycard}
						onPress={()=>{
							Linking.openURL(`mailto:${post.email}`)
							.then((res) => {console.log(res)})
							.catch((err) => {console.log(err)})
						}}
					>
						<View style={styles.cardContent}>
							<Icon name="envelope-o" type='font-awesome' size={29} color="#2979FF" />
							<Text style={styles.mytext}>{post.email}</Text>
						</View>
					</Card>
					<Card style={styles.mycard}>
						<View style={styles.cardContent}>
							<Icon name="address-card-o" type='font-awesome' size={26} color="#2979FF" />
							<Text style={styles.mytext}>{post.address}</Text>
						</View>
					</Card>
				</View>
				<View style={styles.buttonView}>
					<Button
						title=" Reset Password"
						onPress={() => navigation.push("Reset Password")}
						icon={ <Icon name='lock' type='font-awesome' size={24} color= 'white' />}
					/>
					<Button
						title=" Sign Out"
						color="red"
						onPress={() => confirmSignOut()}
						icon={ <Icon name='sign-out' type='font-awesome' size={24} color= 'white' /> }
						buttonStyle={{ backgroundColor: "red" }}
						style={{marginLeft: 10}}
					/>
				</View>
			</ScrollView>
		</ScreenContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		marginLeft: 5,
		marginRight: 5
	},
	mycard:{
        margin:3
    },
	cardContent:{
		flexDirection:"row",
		padding:8
	},
	mytext:{
		fontSize:18,
		marginTop:3,
		marginBottom:3,
		marginLeft:15
	},
	mytextMobile:{
		fontSize:18,
		marginTop:10,
		marginBottom:3,
		marginLeft:24
	},
	buttonView:{
		flexDirection:"row",
		justifyContent:"space-around",
		padding:10,margin:20
	},
	profileTitle:{
		fontSize:25
	},
	profileClinicID:{
		fontSize:18
	},
	mycard:{
		margin:3
	},
	mytext:{
		fontSize:18,
		marginTop:3,
		marginBottom:3,
		marginLeft:15,
		marginRight:15
	},
	mytextMobile:{
		fontSize:18,
		marginTop:10,
		marginBottom:3,
		marginLeft:24
	}
});