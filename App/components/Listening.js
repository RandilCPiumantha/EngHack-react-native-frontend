import React, { useState } from "react";
import { Linking, TextInput } from "react-native";
import { View, Text } from "react-native-animatable";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Title } from 'react-native-paper';

import AppButton from "./quiz/AppButton";

const Listening = () => {

	const [oldtext, setoldtext] = useState("Sri lanka is a beautiful country.I love my country");
	const [newtext, setnewtext] = useState("");
	const [per, setper] = useState(0);
	const [submit, setSubmit] = useState(false)
	const [expanded, setExpanded] = useState(false);

	const URL = "https://6a63fca904fd268f15f7-d5770ffdd579eb31eaa89faeffc55fe7.ssl.cf1.rackcdn.com/elementary-podcasts-s01-e03.mp3"

	const check = (s1, s2) => {
		setSubmit(true)
		let longer = s1;
		let shorter = s2;

		if (s1.length < s2.length) {
			longer = s2;
			shorter = s1;
		}

		let longerLength = longer.length;
		if (longerLength === 0) {
			return 1.0;
		}

		setper((longerLength - editDistance(longer, shorter)) / parseFloat(longerLength));
		return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
	}

	function editDistance(s1, s2) {
		s1 = s1.toLowerCase();
		s2 = s2.toLowerCase();

		var costs = new Array();

		for (var i = 0; i <= s1.length; i++) {
			var lastValue = i;
			for (var j = 0; j <= s2.length; j++) {
				if (i == 0)
					costs[j] = j;
				else {
					if (j > 0) {
						var newValue = costs[j - 1];
						if (s1.charAt(i - 1) != s2.charAt(j - 1))
							newValue = Math.min(Math.min(newValue, lastValue),
							costs[j]) + 1;
						costs[j - 1] = lastValue;
						lastValue = newValue;
					}
				}
			}
			if (i > 0)
				costs[s2.length] = lastValue;
		}
		return costs[s2.length];
	}

	return (
		<View style={{ margin: 20 }}>
			<Text style={{marginBottom:20}}>This transcript is regarding the following podcast. Please follow the link mentioned below.</Text>
			<TouchableOpacity
				onPress={() => {
					Linking.openURL(`${URL}`)
						.then((res) => {console.log(res)})
						.catch((err) => {console.log(err)})
					}
				}
			>
				<Text style={{marginBottom:20, color:"blue"}}>{URL}</Text>
			</TouchableOpacity>
			{expanded ? <Title>{oldtext}</Title> : <Title></Title>}
			<TextInput
				placeholder="Type Your Answer"
				onChangeText={text => setnewtext(text)}
				autoCapitalize="none"
				autoCorrect={false}
				value={newtext}
				style={{ marginTop: 20, marginBottom: 20 }}
			/>
			<View style={{margin:5}}>
				<AppButton
					title="Submit Your Answer"
					onPress={() => {
						check(oldtext, newtext);
						setExpanded(true);
					}}
				/>
			</View>
			<View style={{margin:5}}>
				<AppButton title={expanded ? "Hide the Answer" : "See the Answer"} onPress={() => setExpanded(!expanded)} />
			</View>
			<View style={{margin:5}}>
				<AppButton title="Reset" onPress={() => setnewtext("")} />
			</View>
			{submit && <Text style={{ marginTop: 20, marginBottom: 20 }}>{per * 100}%</Text>}
		</View>
	);
};

export default Listening;