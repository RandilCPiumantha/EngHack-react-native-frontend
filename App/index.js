import React, { useState, useEffect, useMemo } from 'react';
import { View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Icon } from 'react-native-elements';
import * as SecureStore from 'expo-secure-store';

import Splash from "./components/Splash";
import Register from "./components/Register";
import Login from './components/Login';
import Profile from './components/Profile';
import ResetPassword from './components/ResetPassword';
import Grammar from './components/Grammar';
import Reading from './components/Reading';
import Read from './components/Read';
import Chat from './components/Chat';
import { CustomDrawerContent } from './components/CustomDrawerContent';
import { AuthContext } from "./components/context";

// Stack Navigation from SignIn screen
const AuthStack = createStackNavigator();
const AuthStackScreen = () => (
	<AuthStack.Navigator>
		<AuthStack.Screen
			name="Login"
			component={Login}
			options={{ title: "Login" }}
		/>
		<AuthStack.Screen
			name="Register"
			component={Register}
			options={{ title: "Register" }}
		/>
	</AuthStack.Navigator>
);

// Stack Navigation from Profile screen
const ProfileStack = createStackNavigator();
const ProfileStackScreen = ({ navigation }) => (
	<ProfileStack.Navigator>
		<ProfileStack.Screen name="Profile"
			component={Profile}
			options={{ headerLeft: () => (
				<Icon
					name="menu"
					size={24}
					color= 'grey'
					onPress={ () => navigation.toggleDrawer() }
					style={{ marginLeft: 15 }}
				/>
            ) }}
		/>
		<ProfileStack.Screen
			name="Reset Password"
			component={ResetPassword}
		/>
	</ProfileStack.Navigator>
);

// Stack Navigation from Grammar screen
const GrammarStack = createStackNavigator();
const GrammarStackScreen = ({ navigation }) => (
	<GrammarStack.Navigator>
		<GrammarStack.Screen
			name="Grammar"
			component={Grammar}
			options={{ headerLeft: () => (
				<Icon
					name="menu"
					size={24}
					color= 'grey'
					onPress={ () => navigation.toggleDrawer() }
					style={{ marginLeft: 15 }}
				/>
            ) }}
		/>
	</GrammarStack.Navigator>
);

// Stack Navigation from Reading screen
const ReadingStack = createStackNavigator();
const ReadingStackScreen = ({ navigation }) => (
	<ReadingStack.Navigator>
		<ReadingStack.Screen
			name="Reading"
			component={Reading}
			options={{ headerLeft: () => (
				<Icon
					name="menu"
					size={24}
					color= 'grey'
					onPress={ () => navigation.toggleDrawer() }
					style={{ marginLeft: 15 }}
				/>
            ) }}
		/>
		<ReadingStack.Screen
			name="Read"
			component={Read}
		/>
	</ReadingStack.Navigator>
);

// Stack Navigation from Chat screen
const ChatStack = createStackNavigator();
const ChatStackScreen = ({ navigation }) => (
	<ChatStack.Navigator>
		<ChatStack.Screen name="Chat"
			component={Chat}
			options={{ headerLeft: () => (
				<Icon
					name="menu"
					size={24}
					color= 'grey'
					onPress={ () => navigation.toggleDrawer() }
					style={{ marginLeft: 15 }}
				/>
            ) }}
		/>
	</ChatStack.Navigator>
);

// Drawer Navigation bar
const Drawer = createDrawerNavigator();
const DrawerScreen = () => (
	<Drawer.Navigator initialRouteName="Grammar" drawerContent={props => <CustomDrawerContent {...props} />}>
		<Drawer.Screen name="Grammar"
			component={GrammarStackScreen}
			options={ () => ({
				drawerIcon: ({ focused, color, size }) => {
					let iconName;
					iconName = focused ? 'font' : 'font';
					return <Icon name={iconName} size={size} color={color} type='font-awesome' />;
				}
			})}
		/>
		<Drawer.Screen name="Reading"
			component={ReadingStackScreen}
			options={ () => ({
				drawerIcon: ({ focused, color, size }) => {
					let iconName;
					iconName = focused ? 'book' : 'book';
					return <Icon name={iconName} size={size} color={color} type='font-awesome' />;
				}
			})}
		/>
		<Drawer.Screen name="Chat"
			component={ChatStackScreen}
			options={ () => ({
				drawerIcon: ({ focused, color, size }) => {
					let iconName;
					iconName = focused ? 'comments' : 'comments';
					return <Icon name={iconName} size={size} color={color} type='font-awesome' />;
				}
			})}
		/>
		<Drawer.Screen name="Profile"
			component={ProfileStackScreen}
			options={ () => ({
				drawerIcon: ({ focused, color, size }) => {
					let iconName;
					iconName = focused ? 'user' : 'user';
					return <Icon name={iconName} size={size} color={color} type='font-awesome' />;
				}
			})}
		/>
	</Drawer.Navigator>
);

// Render Authentication & Drawer at the initial app deployment
const RootStack = createStackNavigator();
const RootStackScreen = ({ username, password, userJWT }) => (
	<RootStack.Navigator headerMode="none">
		{username && password && userJWT ? (
			<RootStack.Screen
				name="App"
				component={DrawerScreen}
				options={{
					animationEnabled: false
				}}
			/>
			) : (
			<RootStack.Screen
				name="Auth"
				component={AuthStackScreen}
				options={{
					animationEnabled: false
				}}
			/>
		)}
	</RootStack.Navigator>
);

export default () => {

	const [isLoading, setIsLoading] = useState(true);
	const [username, setUsername] = useState();
	const [password, setPassword] = useState();
	const [userJWT, setUserJWT] = useState();

	const loadDetails = async () => {
		try {
			let username = await SecureStore.getItemAsync("appUsername");
			let password = await SecureStore.getItemAsync("appPassword");
			let userJWT = await SecureStore.getItemAsync("userJWT");

			if (username && password && userJWT) {
				setUsername(username);
				setPassword(password);
				setUserJWT(userJWT);
			}
		} catch (err) {
			alert (err);
		}
	}

	// Authentication process
	const authContext = useMemo(() => {
		return {
			signIn: (userJWT,username,password) => {
				setIsLoading(false);
				setUsername(username);
				setPassword(password);
				setUserJWT(userJWT);
			},
			signOut: () => {
				setIsLoading(false);
				setUsername();
				setPassword();
				setUserJWT();
			},
			saveDetails: async (userJWT,username,password) => {
				try {
					await SecureStore.setItemAsync("appUsername", String(username));
					await SecureStore.setItemAsync("appPassword", String(password));
					await SecureStore.setItemAsync("userJWT", String(userJWT));
				} catch (err) {
					alert (err);
				}
			},
			removeDetails: async () => {
				try {
					await SecureStore.deleteItemAsync("appUsername");
					await SecureStore.deleteItemAsync("appPassword");
					await SecureStore.deleteItemAsync("userJWT");
				} catch (err) {
					alert (err);
				}
			},
			username,
			password,
			userJWT
		};
	}, [username,password,userJWT]);

	// Splash screen
	useEffect(() => {
		loadDetails();
		setTimeout(() => {
			setIsLoading(false);
		}, 1500);
	}, []);

	if (isLoading) {
		return <View><Splash /></View>;
	}

	return (
		<AuthContext.Provider value={authContext}>
			<NavigationContainer>
				<RootStackScreen username={username} password={password} userJWT={userJWT} />
			</NavigationContainer>
		</AuthContext.Provider>
	);
}