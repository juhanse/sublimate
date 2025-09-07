import { View, Text, useWindowDimensions, StyleSheet, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ImageOne from "@/assets/onboarding/test/1.png";
import ImageTwo from "@/assets/onboarding/test/2.png";
import ImageThree from "@/assets/onboarding/test/3.png";
import ImageFour from "@/assets/onboarding/test/4.png";
import ImageFive from "@/assets/onboarding/test/5.png";
import { useState } from "react";
import { runOnJS, useAnimatedReaction, useSharedValue } from "react-native-reanimated";
import { Marquee } from "@/components/onboarding/marquee";
import { _itemWidth } from "@/components/onboarding/marquee-item";
import ImageBg from "@/components/onboarding/image-bg";
import { useDebouncedValue } from "@/hooks/useDebounce";
import { useOnboardingStore } from "@/contexts/OnboardingContext";
import * as Haptics from 'expo-haptics';

const events = [
	{
		id: 1,
		image: ImageOne,
	},
	{
		id: 2,
		image: ImageTwo,
	},
	{
		id: 3,
		image: ImageThree,
	},
	{
		id: 4,
		image: ImageFour,
	},
	{
		id: 5,
		image: ImageFive,
	},
];

export default function OnboardingScreen() {
	const { markOnboardingSeen } = useOnboardingStore();
	// Track which event card is currently centered/active
	const [activeIndex, setActiveIndex] = useState(0);
	// Debounced version prevents rapid background image changes during fast scrolling
	const debouncedActiveIndex = useDebouncedValue(activeIndex, 500);

	const insets = useSafeAreaInsets();
	const { width } = useWindowDimensions();

	// Shared value for horizontal scroll position - drives all marquee animations
	const scrollOffsetX = useSharedValue(0);
	// Total width needed to display all event cards in sequence
	const allItemsWidth = events.length * _itemWidth;

	// Calculates which card is centered and updates background image accordingly
	useAnimatedReaction(
		() => scrollOffsetX.value,
		(currentValue) => {
			// Normalize to handle infinite scroll wrapping (keeps value within 0 to allItemsWidth)
			const normalizedOffset = ((currentValue % allItemsWidth) + allItemsWidth) % allItemsWidth;
			// Center point offset to determine which card is in the middle of screen
			const shift = width / 2;
			// Calculate which card index is currently centered based on scroll position
			const activeItemIndex = Math.abs(Math.floor((normalizedOffset + shift) / _itemWidth));

			// Handle edge case when scrolling reaches the end
			if (activeItemIndex === events.length) {
				runOnJS(setActiveIndex)(0);
			}

			// Update active index only when it actually changes to avoid unnecessary re-renders
			if (
				activeItemIndex >= 0 &&
				activeItemIndex < events.length &&
				activeItemIndex !== activeIndex
			) {
				runOnJS(setActiveIndex)(activeItemIndex);
			}
		}
	);

	const handleStart = async () => {
		await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
		markOnboardingSeen();
	};

	return (
		<View style={[ styles.container, { paddingTop: insets.top + 16, paddingBottom: insets.bottom } ]}>
			{/* Background image */}
			<ImageBg itemKey={events[debouncedActiveIndex].id.toString()} source={events[debouncedActiveIndex].image} />
			{/* Marquee (60% height) */}
			<View style={styles.marqueeContainer}>
				<Marquee events={events} scrollOffsetX={scrollOffsetX} />
			</View>

			{/* Bottom content (40% height) */}
			<View style={styles.bottomContainer}>
				<View style={styles.skeletonWrapper}>
					<Text style={styles.skeleton}>
						Get the party started with Invites
					</Text>
					<View style={[styles.skeleton, styles.skeleton80, { marginBottom: 16 }]} />
					<Text style={styles.skeletonSmall}>
						An iCloud+ subscription is required to invite people
					</Text>
				</View>

				<TouchableOpacity style={styles.nextButton} onPress={handleStart}>
					<Text style={{ textAlign: "center", lineHeight: 56, color: "black", fontFamily: "Mona", fontSize: 16 }}>
						Commencer
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#1e293b",
	},
	marqueeContainer: {
		flexBasis: "60%",
		paddingTop: 40,
	},
	bottomContainer: {
		flexBasis: "40%",
		alignItems: "center",
		justifyContent: "space-between",
		paddingTop: 48,
		paddingBottom: 16,
	},
	skeletonWrapper: {
		width: "100%",
		alignItems: "center",
		justifyContent: "center"
	},
	skeleton: {
		width: "80%",
		color: "white",
		textAlign: "center",
		fontSize: 28,
		fontFamily: "Mona",
	},
	skeletonSmall: {
		width: "60%",
		color: "rgba(255,255,255,0.15)",
		textAlign: "center",
		fontSize: 16,
		fontFamily: "Mona",
	},
	skeleton60: {
		width: "60%",
	},
	skeleton80: {
		width: "80%",
	},
	skeleton70: {
		width: "70%",
	},
	skeleton30: {
		width: "30%",
		marginBottom: 0,
	},
	nextButton: {
		height: 56,
		width: "50%",
		borderRadius: 9999,
		backgroundColor: "rgba(236, 236, 236, 1)",
		shadowColor: "#000",
		shadowOpacity: 0.25,
		shadowRadius: 4,
		shadowOffset: { width: 0, height: 2 },
		elevation: 5,
	},
});
