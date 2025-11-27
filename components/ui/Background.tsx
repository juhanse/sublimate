import React from "react";
import { View, ImageBackground, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";

type BackgroundProps = {
	url?: string | null;
};

export const Background = ({ url }: BackgroundProps) => {
	const source =
		typeof url === "string" && url.length > 0
			? { uri: url }
			: require("../../assets/images/background.png");

	return (
		<View style={styles.container}>
			<ImageBackground
				source={source}
				style={styles.image}
				resizeMode="cover"
			>
				<BlurView intensity={100} style={StyleSheet.absoluteFill}>
					<View style={styles.overlay} />
				</BlurView>
			</ImageBackground>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		...StyleSheet.absoluteFillObject,
		zIndex: -1,
	},
	image: {
		flex: 1,
		width: "100%",
		height: "100%",
	},
	overlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "rgba(30, 30, 30, 0.5)",
	},
});
