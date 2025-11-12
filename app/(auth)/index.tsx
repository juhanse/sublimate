import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as AppleAuthentication from 'expo-apple-authentication';
import { BlurView } from "expo-blur";

export default function WelcomeScreen() {
	return (
		<ImageBackground
			source={require("@/assets/images/background.png")}
			style={styles.image}
			resizeMode="cover"
		>
			<BlurView intensity={100} style={StyleSheet.absoluteFill}>
				<View style={styles.overlay} />
			</BlurView>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
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
