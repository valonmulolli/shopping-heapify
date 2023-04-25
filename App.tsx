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

export default function App() {
	const theme: Theme = useMemo(
		() => ({
			...DefaultTheme,
			colors: { 
        ...DefaultTheme.colors, 
        background: '#f5f5f5',
        text: '#191919',
        border: '#D9D9D9',
        primary: '#191919',
      },
		}),
		[]
	);
	return (
		<View style={styles.container}>
			<NavigationContainer theme={theme}>
				<RootNavigator />
			</NavigationContainer>
			<StatusBar style='dark' />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
