import {
	View,
	Text,
	Image,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	FlatList,
} from 'react-native';
import React, { useCallback, useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@react-navigation/native';
import Icons from '@expo/vector-icons/MaterialIcons';
import MasonryList from '@react-native-seoul/masonry-list';
import { BlurView } from 'expo-blur';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import CustomBackdrop from '../components/CustomBackdrop';

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
	const bottomSheetModalRef = useRef<BottomSheetModal>(null);

	// const snapPoints = useMemo(() => ['25%', '50%'], []);

	// callbacks
	const openFilterModal = useCallback(() => {
		bottomSheetModalRef.current?.present();
	}, []);
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
						onPress={openFilterModal}
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

				{/* Masonary */}
				<MasonryList
					data={[1, 2, 45, 1, 5, 3, 234]}
					keyExtractor={(item): string => item}
					numColumns={2}
					contentContainerStyle={{ paddingHorizontal: 16 }}
					renderItem={({ item, i }) => (
						<View style={{ padding: 6 }}>
							<View
								style={{
									aspectRatio: i === 0 ? 1 : 2 / 3,
									position: 'relative',
									overflow: 'hidden',
									borderRadius: 24,
								}}
							>
								<Image
									source={{
										uri: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
									}}
									resizeMode='cover'
									style={StyleSheet.absoluteFill}
								/>
								<View style={[StyleSheet.absoluteFill, { padding: 10 }]}>
									<View style={{ flexDirection: 'row', gap: 8, padding: 1 }}>
										<Text
											style={{
												flex: 1,
												fontSize: 16,
												fontWeight: '600',
												color: colors.text,
											}}
										>
											New Collections
										</Text>
										<View
											style={{
												backgroundColor: colors.background,
												borderRadius: 100,
												height: 24,
												aspectRatio: 1,
												alignItems: 'center',
												justifyContent: 'center',
											}}
										>
											<Icons
												name='favorite-border'
												size={20}
												color={colors.text}
											/>
										</View>
									</View>
									<View style={{ flex: 1 }} />
									<BlurView
										style={{
											flexDirection: 'row',
											alignItems: 'center',
											backgroundColor: 'rgba(0,0,0,0.35)',
											padding: 8,
											borderRadius: 100,
											overflow: 'hidden',
										}}
										intensity={10}
									>
										<Text
											style={{
												flex: 1,
												color: '#0E201E',
												fontSize: 16,
												fontWeight: '600',
												marginLeft: 4,
											}}
											numberOfLines={1}
										>
											€160.00
										</Text>
										<TouchableOpacity
											style={{
												paddingHorizontal: 12,
												paddingVertical: 8,
												borderRadius: 100,
												backgroundColor: '#fff',
											}}
										>
											<Icons name='shopping-bag' size={20} color='#000' />
										</TouchableOpacity>
									</BlurView>
								</View>
							</View>
						</View>
					)}
					onEndReachedThreshold={0.1}
				/>
			</SafeAreaView>

			<BottomSheetModal
				snapPoints={['80%']}
				index={0}
				ref={bottomSheetModalRef}
				backdropComponent={(props) => <CustomBackdrop {...props} />}
			>
				<Text>Modal</Text>
			</BottomSheetModal>
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
					uri: 'https://images.unsplash.com/photo-1577982787983-e07c6730f2d3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1248&q=80',
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
