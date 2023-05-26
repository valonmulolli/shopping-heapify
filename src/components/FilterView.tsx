import {
	View,
	Text,
	TouchableOpacity,
	Slider,
	SafeAreaView,
} from 'react-native';
import React, { ReactNode, useState } from 'react';
import { useTheme } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Icons from '@expo/vector-icons/MaterialIcons';
import PriceRangeSelector from './PriceRangeSelector';

const MAX_PRICE = 500;

const COLORS = [
	{
		color: 'red',
		label: 'red',
		itemCount: 4,
	},
	{
		color: 'blue',
		label: 'blue',
		itemCount: 2,
	},
	{
		color: 'green',
		label: 'green',
		itemCount: 6,
	},
	{
		color: 'purple',
		label: 'purple',
		itemCount: 10,
	},
];
const SLEEVES = [
	{
		id: 'sortSleeves',
		label: 'Sort Sleeve',
		itemCount: 20,
	},
	{
		id: 'longSleeves',
		label: 'Long Sleeve',
		itemCount: 100,
	},
	{
		id: 'sleeveless',
		label: 'Sleeve Less',
		itemCount: 600,
	},
];

const FilterView = () => {
	const [startPrice, setStartPrice] = useState(50);
	const [endPrice, setEndPrice] = useState(250);
	const theme = useTheme();
	const insets = useSafeAreaInsets();
	return (
		<View style={{ flex: 1 }}>
			<ScrollView style={{ flex: 1 }}>
				<View style={{ paddingHorizontal: 24, gap: 24 }}>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							paddingHorizontal: 24,
						}}
					>
						<Text style={{ flex: 1, fontSize: 20, fontWeight: '700' }}>
							Filters
						</Text>
						<TouchableOpacity>
							<Text>Reset</Text>
						</TouchableOpacity>
					</View>

					{/* Range Selector */}

					<PriceRangeSelector
						minPrice={0}
						maxPrice={MAX_PRICE}
						startPrice={startPrice}
						endPrice={endPrice}
						onStartPriceChange={setStartPrice}
						onEndPriceChange={setEndPrice}
					/>

					{/* Sports Category filter*/}

					<View style={{ paddingHorizontal: 24 }}>
						<Text style={{ fontSize: 16, fontWeight: '700', marginBottom: 12 }}>
							Sports
						</Text>
						<View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
							{new Array(8).fill('').map((_, i) => {
								return <Chip itemCount={i} label='item' isSelected={i === 0} />;
							})}
						</View>
					</View>
					{/* Color filter*/}

					<View style={{ paddingHorizontal: 24 }}>
						<Text style={{ fontSize: 16, fontWeight: '700', marginBottom: 12 }}>
							Color
						</Text>
						<View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
							{COLORS.map((item, i) => {
								return (
									<Chip
										itemCount={item.itemCount}
										label={item.label}
										left={
											<View
												style={{
													backgroundColor: item.color,
													width: 12,
													height: 12,
													borderRadius: 8,
												}}
											/>
										}
										isSelected={i === 0}
									/>
								);
							})}
						</View>
					</View>
					{/* Sleves filter*/}

					<View style={{ paddingHorizontal: 24 }}>
						<Text style={{ fontSize: 16, fontWeight: '700', marginBottom: 12 }}>
							Sleeves
						</Text>
						<View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
							{SLEEVES.map((item, i) => {
								return (
									<Chip
										itemCount={item.itemCount}
										label={item.label}
										isSelected={i === 0}
									/>
								);
							})}
						</View>
					</View>
				</View>
			</ScrollView>

			{/* Button */}

			<View style={{ padding: 24, paddingBottom: insets.bottom,marginBottom: 10}}>
				<TouchableOpacity
					style={{
						backgroundColor: theme.colors.background,
						height: 64,
						borderRadius: 64,
						alignItems: 'center',
						justifyContent: 'center',
						position: 'relative',
					}}
				>
					<Text
						style={{
							fontSize: 16,
							fontWeight: '600',
							color: theme.colors.primary,
						}}
					>
						Apply Filters
					</Text>

					<View
						style={{
							backgroundColor: theme.colors.card,
							width: 40,
							aspectRatio: 1,
							borderRadius: 40,
							alignItems: 'center',
							justifyContent: 'center',
							position: 'absolute',
							top: 12,
							right: 12,
							bottom: 12,
						}}
					>
						<Icons name='arrow-forward' size={24} color={theme.colors.text} />
					</View>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default FilterView;

const Chip = ({
	isSelected,
	label,
	itemCount,
	left,
}: {
	isSelected: boolean;
	label: string;
	itemCount: number;
	left?: ReactNode;
}) => {
	const theme = useTheme();
	return (
		<View
			style={{
				paddingHorizontal: 16,
				paddingVertical: 8,
				borderRadius: 100,
				backgroundColor: isSelected
					? theme.colors.text
					: theme.colors.background,
				flexDirection: 'row',
				alignItems: 'center',
			}}
		>
			{!!left && <View style={{ marginRight: 4 }}>{left}</View>}
			<Text
				style={{
					fontSize: 14,
					fontWeight: '600',
					color: isSelected ? theme.colors.background : theme.colors.text,
				}}
			>
				{label} [{itemCount}]
			</Text>
		</View>
	);
};
