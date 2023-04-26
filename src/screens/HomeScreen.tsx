import {
	View,
	Text,
	Image,
	ScrollView,
	TouchableOpacity,
	FlatList,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import Icons from '@expo/vector-icons/MaterialIcons';

const CATEGORIES = [
	'Clothing',
	'Shoes',
	'Accessories',
	'Jewelry',
	'Bags',
	'Watches',
	'Beauty',
	'Gifts',
];

const AVATAR_URL =
	'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80';

const HomeScreen = () => {
	const { colors } = useTheme();
	const [categoryIndex, setCategoryIndex] = useState(0);
	return (
		<ScrollView>
			<SafeAreaView style={{ paddingVertical: 24, gap: 24 }}>
				{/* Header */}
				<View
					style={{
						paddingHorizontal: 24,
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
				{/* Search Bar */}
				<View style={{ flexDirection: 'row', paddingHorizontal: 24, gap: 12 }}>
					<TouchableOpacity
						style={{
							flex: 1,
							height: 52,
							borderRadius: 52,
							borderWidth: 1,
							borderColor: colors.border,
							alignItems: 'center',
							paddingHorizontal: 24,
							flexDirection: 'row',
							gap: 12,
						}}
					>
						<Icons
							name='search'
							size={24}
							color={colors.text}
							style={{ opacity: 0.5 }}
						/>
						<Text
							style={{
								flex: 1,
								fontSize: 16,
								color: colors.text,
								opacity: 0.5,
							}}
						>
							Search
						</Text>
					</TouchableOpacity>

					<TouchableOpacity
						style={{
							width: 52,
							aspectRatio: 1,
							alignItems: 'center',
							justifyContent: 'center',
							borderRadius: 52,
							backgroundColor: colors.primary,
						}}
					>
						<Icons name='tune' size={24} color={colors.background} />
					</TouchableOpacity>
				</View>
				{/* Grid Collection */}
				<View style={{ paddingHorizontal: 24 }}>
					{/* Title */}
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'space-between',
							marginBottom: 12,
						}}
					>
						<Text style={{ fontSize: 20, fontWeight: '700' }}>
							New Collections
						</Text>
						<TouchableOpacity>
							<Text>See All</Text>
						</TouchableOpacity>
					</View>
					<View style={{ flexDirection: 'row', height: 200, gap: 12 }}>
						<Card />
						<View style={{ flex: 1, gap: 12 }}>
							<Card />
							<Card />
						</View>
					</View>
				</View>
				{/* Categories */}
				<FlatList
					data={CATEGORIES}
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{
						paddingHorizontal: 16,
						gap: 16,
					}}
					renderItem={({ item, index }) => {
						const isSelected = categoryIndex === index;
						return (
							<TouchableOpacity
								onPress={() => setCategoryIndex(index)}
								style={{
									backgroundColor: isSelected ? colors.primary : colors.card,
									paddingHorizontal: 24,
									paddingVertical: 16,
									borderRadius: 100,
									borderWidth: isSelected ? 0 : 1,
									borderColor: colors.border,
								}}
							>
								<Text
									style={{
										color: isSelected ? colors.background : colors.text,
										fontWeight: '600',
										fontSize: 16,
										opacity: isSelected ? 1 : 0.5,
									}}
								>
									{item}
								</Text>
							</TouchableOpacity>
						);
					}}
				/>
			</SafeAreaView>
		</ScrollView>
	);
};

export default HomeScreen;

const Card = () => {
	return (
		<View
			style={{
				flex: 1,
				position: 'relative',
				overflow: 'hidden',
				borderRadius: 24,
			}}
		>
			<Image
				source={{
					uri: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
				}}
				resizeMode='cover'
				style={{
					position: 'absolute',
					top: 0,
					left: 0,
					right: 0,
					bottom: 0,
				}}
			/>
			<View
				style={{
					position: 'absolute',
					left: 16,
					top: 16,
					paddingHorizontal: 16,
					paddingVertical: 10,
					backgroundColor: 'rgba(0,0,0,0.25)',
					borderRadius: 100,
				}}
			>
				<Text style={{ fontSize: 14, fontWeight: '600', color: '#fff' }}>
					€130
				</Text>
			</View>
		</View>
	);
};
