import { View, Text, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
	return (
		<ScrollView>
			<SafeAreaView>
				<Text>HomeScreen</Text>
			</SafeAreaView>
		</ScrollView>
	);
};

export default HomeScreen;