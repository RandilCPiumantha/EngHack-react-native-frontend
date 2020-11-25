import React, { useContext, useState, useEffect } from "react";

import { AuthContext } from "./context";
import ChatClass from './ChatClass';
import { Loading } from './Loading';

export default function Chat() {

	const { username } = useContext(AuthContext);
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
		<ChatClass name={username} />
	);
};