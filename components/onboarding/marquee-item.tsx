// apple-invites-welcome-screen-animation 🔽

import React, { FC, memo } from "react";
import { Dimensions, Image, View, StyleSheet } from "react-native";
import Animated, { FadeIn, interpolate, SharedValue, useAnimatedStyle } from "react-native-reanimated";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";

const screenWidth = Dimensions.get("screen").width;

// Each card takes 60% of screen width - ensures cards overlap slightly for continuous feel
export const _itemWidth = screenWidth * 0.6;

type Props = {
	index: number;
	imageSrc: number;
	scrollOffsetX: SharedValue<number>;
	allItemsWidth: number;
};

const MarqueeItemComponent: FC<Props> = ({ index, imageSrc, scrollOffsetX, allItemsWidth }) => {
	// Centers the carousel - ensures middle item appears in screen center at scroll position 0
	const shift = (allItemsWidth - screenWidth) / 2;
	// Calculate this item's base position in the infinite scroll sequence
	const initialLeft = index * _itemWidth - shift;

	const rContainerStyle = useAnimatedStyle(() => {
		// Normalize scroll offset to prevent overflow and enable infinite scrolling
		const normalizedOffset = ((scrollOffsetX.value % allItemsWidth) + allItemsWidth) % allItemsWidth;
		// Calculate this item's current position relative to screen
		const left = ((initialLeft - normalizedOffset) % allItemsWidth) + shift;

		// Create subtle tilt effect: left edge tilts left (-0.6°), right edge tilts right (+0.6°)
		const rotation = interpolate(left, [0, screenWidth - _itemWidth], [-0.6, 0.6]);
		// Vertical parallax: items at edges sit higher, center item sits lower (depth effect)
		const translateY = interpolate(
			left,
			[0, (screenWidth - _itemWidth) / 2, screenWidth - _itemWidth],
			[1, -0.5, 1] // Edge items +1px, center item -0.5px for subtle depth
		);

		return {
			left,
			transform: [{ rotateZ: `${rotation}deg` }, { translateY }],
		};
	});

	return (
		<Animated.View style={[ styles.animatedContainer, rContainerStyle, { width: _itemWidth, transformOrigin: "bottom" } ]}>
			<View style={styles.cardWrapper}>
				<View style={styles.card}>
					{/* Base card image - sharp and clear */}
					<Image source={imageSrc} style={styles.image} />

					{/* Glassmorphism effect overlay */}
					<Animated.View entering={FadeIn} style={[styles.glassOverlay, { width: _itemWidth }]}>
						<MaskedView
							maskElement={
								<LinearGradient
									locations={[0, 0.4, 0.7, 1]}
									colors={["transparent", "transparent", "black", "black"]}
									style={StyleSheet.absoluteFillObject}
								/>
							}
							style={StyleSheet.absoluteFillObject}
						>
							<Image source={imageSrc} style={styles.image} />
							<BlurView intensity={100} style={StyleSheet.absoluteFillObject} />
						</MaskedView>
					</Animated.View>

					{/* Content overlay */}
					<View style={styles.contentOverlay}>
						<View style={styles.titlePlaceholder} />
						<View style={styles.descPlaceholderWide} />
						<View style={styles.descPlaceholderNarrow} />
					</View>
				</View>
			</View>
		</Animated.View>
	);
};

export const MarqueeItem = memo(MarqueeItemComponent);

const styles = StyleSheet.create({
	animatedContainer: {
		position: "absolute",
		height: "100%",
		padding: 8,
	},
	cardWrapper: {
		flex: 1,
		shadowColor: "#000",
		shadowOpacity: 0.25,
		shadowRadius: 4,
		shadowOffset: { width: 0, height: 2 },
		elevation: 5,
	},
	card: {
		flex: 1,
		borderRadius: 24,
		overflow: "hidden",
	},
	image: {
		height: "100%",
		width: "100%",
	},
	glassOverlay: {
		position: "absolute",
		bottom: 0,
		height: "100%",
	},
	contentOverlay: {
		...StyleSheet.absoluteFillObject,
		alignItems: "center",
		justifyContent: "flex-end",
		padding: 24,
	},
	titlePlaceholder: {
		backgroundColor: "rgba(255,255,255,0.3)",
		borderRadius: 9999,
		height: 32,
		width: "50%",
		marginBottom: 12,
	},
	descPlaceholderWide: {
		backgroundColor: "rgba(255,255,255,0.2)",
		borderRadius: 9999,
		height: 20,
		width: "75%",
		marginBottom: 4,
	},
	descPlaceholderNarrow: {
		backgroundColor: "rgba(255,255,255,0.2)",
		borderRadius: 9999,
		height: 20,
		width: "50%",
	},
});
