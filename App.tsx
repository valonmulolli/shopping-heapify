import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import RootNavigator from './src/navigators/RootNavigator';
import {
	DefaultTheme,
	NavigationContainer,
	Theme,
	useTheme,
} from '@react-navigation/native';
import { useMemo } from 'react';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
	const theme: Theme = useMemo(
		() => ({
			...DefaultTheme,
			colors: {
				...DefaultTheme.colors,
				background: '#D9FF00',
				text: '#191919',
				border: '#D9D9D9',
				primary: '#191919',
			},
		}),
		[]
	);
	return (
		<GestureHandlerRootView style={styles.container}>
			<NavigationContainer theme={theme}>
				<RootNavigator />
				<StatusBar style='dark' />
			</NavigationContainer>
		</GestureHandlerRootView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
