import { View, Text } from 'react-native';
import React, { useEffect, useState, useMemo } from 'react';
import { useTheme } from '@react-navigation/native';
import Animated, {
	event,
	runOnJS,
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useSharedValue,
} from 'react-native-reanimated';
import {
	PanGestureHandler,
	PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';

const PriceRangeSelector = ({
	minPrice,
	maxPrice,
	startPrice,
	endPrice,
	onStartPriceChange,
	onEndPriceChange,
}: {
	minPrice: number;
	maxPrice: number;
	startPrice: number;
	endPrice: number;
	onStartPriceChange: (value: number) => void;
	onEndPriceChange: (value: number) => void;
}) => {
	const theme = useTheme();
	const [barWidth, setbarWidth] = useState(0);
	const leftHandlePosition = useSharedValue(0);
	const rightHandlePosition = useSharedValue(0);

	const startHandleGesture = useAnimatedGestureHandler<
		PanGestureHandlerGestureEvent,
		{
			prevPostion: number;
		}
	>({
		onStart(event, context) {
			context.prevPostion = leftHandlePosition.value;
		},
		onActive(event, context) {
			leftHandlePosition.value = Math.min(
				rightHandlePosition.value,
				Math.max(0, context.prevPostion + event.translationX)
			);

			runOnJS(onStartPriceChange)(
				Math.round((maxPrice / barWidth) * leftHandlePosition.value)
			);
		},
	});
	const rightHandleGesture = useAnimatedGestureHandler<
		PanGestureHandlerGestureEvent,
		{
			prevPostion: number;
		}
	>({
		onStart(event, context) {
			context.prevPostion = rightHandlePosition.value;
		},
		onActive(event, context) {
			rightHandlePosition.value = Math.min(
				barWidth,
				Math.max(
					leftHandlePosition.value,
					context.prevPostion + event.translationX
				)
			);

			runOnJS(onEndPriceChange)(
				Math.round((maxPrice / barWidth) * rightHandlePosition.value)
			);
		},
	});

	const leftHandleStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: leftHandlePosition.value }],
	}));
	const rightHandleStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: rightHandlePosition.value }],
	}));

	const barHightlightStyle = useAnimatedStyle(() => ({
		left: leftHandlePosition.value,
		right: barWidth - rightHandlePosition.value,
	}));

	const bars = useMemo(
		() => (
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'flex-end',
					justifyContent: 'space-between',
				}}
			>
				{new Array(Math.round(maxPrice / 50)).fill('').map((_, i) => {
					const randomValue = Math.random();
					return (
						<View
							key={i}
							style={{
								flex: 1,
								height: Math.round(randomValue * 40) + 8,
								backgroundColor: '#3b82f6',
								opacity: Math.max(0.2, Math.min(0.5, randomValue)),
							}}
						/>
					);
				})}
			</View>
		),
		[]
	);

	useEffect(() => {
		if (barWidth === 0) return;

		leftHandlePosition.value = (startPrice * barWidth) / maxPrice;
		rightHandlePosition.value = (endPrice * barWidth) / maxPrice;
	}, [barWidth]);

	return (
		<View style={{ paddingHorizontal: 24 }}>
			<View style={{ marginBottom: 24 }}>
				<Text>Price Range</Text>
			</View>
			{bars}
			<View
				style={{
					height: 1,
					width: '100%',
					backgroundColor: theme.colors.background,
					position: 'relative',
					marginBottom: 16,
				}}
				onLayout={(event) => {
					setbarWidth(event.nativeEvent.layout.width);
				}}
			>
				<Animated.View
					style={[
						barHightlightStyle,
						{
							position: 'absolute',
							height: '100%',
							backgroundColor: theme.colors.primary,
						},
					]}
				/>
				<PanGestureHandler onGestureEvent={startHandleGesture}>
					<Animated.View style={[leftHandleStyle, { position: 'absolute' }]}>
						<View
							style={{
								backgroundColor: theme.colors.card,
								width: 1000,
								position: 'absolute',
								right: 12,
								height: 48,
								bottom: 24,
							}}
						/>
						<SliderHandle label={`€${startPrice}`} />
					</Animated.View>
				</PanGestureHandler>
				<PanGestureHandler onGestureEvent={rightHandleGesture}>
					<Animated.View
						style={[rightHandleStyle, { position: 'absolute', zIndex: 10 }]}
					>
						<View
							style={{
								backgroundColor: theme.colors.card,
								width: 1000,
								position: 'absolute',
								left: 12,
								height: 48,
								bottom: 24,
							}}
						/>
						<SliderHandle label={`€${endPrice}`} />
					</Animated.View>
				</PanGestureHandler>
			</View>
		</View>
	);
};

export default PriceRangeSelector;

const SliderHandle = ({ label }: { label: string }) => {
	const theme = useTheme();
	return (
		<View
			style={{
				height: 24,
				aspectRatio: 1,
				alignItems: 'center',
				justifyContent: 'center',
				borderRadius: 100,
				borderColor: theme.colors.primary,
				backgroundColor: theme.colors.background,
				borderWidth: 2,
				position: 'relative',
				transform: [{ translateX: -12 }, { translateY: -12 }],
			}}
		>
			<View
				style={{
					width: 3,
					height: 3,
					borderRadius: 10,
					backgroundColor: theme.colors.primary,
				}}
			/>
			<View
				style={{
					position: 'absolute',
					top: 24,
					width: 200,
					alignItems: 'center',
				}}
			>
				<View style={{ backgroundColor: theme.colors.card }}>
					<Text numberOfLines={1} style={{ color: theme.colors.text }}>
						{label}
					</Text>
				</View>
			</View>
		</View>
	);
};
