import React from "react";
import { View, Text, Image, StyleSheet, Alert } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";

import { AuthContext } from "./context";

export function CustomDrawerContent(props) {

    const { signOut } = React.useContext(AuthContext);

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
                    }
                }
            ],
            { cancelable: false }
        );
    }

	return (
		<DrawerContentScrollView {...props}>
			<View style={styles.drawerHeader}>
                <View style={{flex:1}}>
                    <Image source={require('../../assets/splash.png')} style={styles.drawerImage} />
                </View>
                <View style={{flex: 2}}>
                    <Text style={styles.drawerHeaderText}>EngHack</Text>
                </View>
            </View>
			<DrawerItemList {...props} />
            <Button
				title=" Sign Out"
				color="red"
				onPress={() => confirmSignOut()}
				icon={ <Icon name='sign-out' type='font-awesome' size={24} color= 'white' /> }
                buttonStyle={{ backgroundColor: "red" }}
                style={styles.signOutBtn}
			/>
		</DrawerContentScrollView>
	);
}

const styles = StyleSheet.create({
    drawerHeader: {
        backgroundColor: '#2979FF',
        height: 75,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold'
    },
    drawerImage: {
        width: 150,
        height: 150
    },
    signOutBtn: {
        marginTop: 20,
        marginBottom: 20,
        marginRight: 50,
        marginLeft: 50
    }
});