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
import BottomSheet, { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

export default function App() {
	const theme: Theme = useMemo(
		() => ({
			...DefaultTheme,
			colors: {
				...DefaultTheme.colors,
				background: '#D9FF00',
				text: '#0E201E',
				border: '#D9D9D9',
				primary: '#191919',
			},
		}),
		[]
	);
	return (
		<GestureHandlerRootView style={styles.container}>
			<NavigationContainer theme={theme}>
				<BottomSheetModalProvider>
					<RootNavigator />
				</BottomSheetModalProvider>
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
