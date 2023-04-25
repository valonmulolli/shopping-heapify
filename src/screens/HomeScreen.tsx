import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import Icons from '@expo/vector-icons/MaterialIcons';

const AVATAR_URL =
	'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80';

const HomeScreen = () => {
	const { colors } = useTheme();

	return (
		<ScrollView>
			<SafeAreaView>
				<View
					style={{
						paddingHorizontal: 24,
						paddingVertical: 24,
						flexDirection: 'row',
						alignItems: 'center',
						gap: 8,
					}}
				>
					<Image
						source={{ uri: AVATAR_URL }}
						style={{ width: 52, aspectRatio: 1, borderRadius: 52 }}
						resizeMode='cover'
					/>
					<View style={{ flex: 1 }}>
						<Text
							style={{
								fontSize: 20,
								fontWeight: '600',
								marginBottom: 8,
								color: colors.text,
							}}
							numberOfLines={1}
						>
							Hi Ana! 👋
						</Text>
						<Text
							style={{ color: colors.text, opacity: 0.5 }}
							numberOfLines={1}
						>
							Discover Fashion that suit your style
						</Text>
					</View>
					<TouchableOpacity
						style={{
							width: 52,
							aspectRatio: 1,
							alignItems: 'center',
							justifyContent: 'center',
							borderRadius: 52,
							borderWidth: 1,
							borderColor: colors.border,
						}}
					>
						<Icons name='notifications' size={24} color={colors.text} />
					</TouchableOpacity>
				</View>
			</SafeAreaView>
		</ScrollView>
	);
};

export default HomeScreen;
