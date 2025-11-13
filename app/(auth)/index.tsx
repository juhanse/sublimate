import { View, Text, ImageBackground, Dimensions, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { BlurView } from "expo-blur";
import Button from '@/components/ui/Button';
import { PosX, PosY } from '@/constants/Responsive';

export default function WelcomeScreen() {
	return (
		<ImageBackground
			source={require("@/assets/images/background.png")}
			style={styles.image}
			resizeMode="cover"
		>
			<BlurView intensity={100} style={StyleSheet.absoluteFill}>
				<View style={styles.overlay} />
				<Text style={styles.title}>
					Achieving your goals is just waiting for you
				</Text>
				<View style={[styles.buttonContainer]}>
					<Button type="primary" onPress={() => router.push('/(auth)/auth')}>
						Discover
					</Button>
				</View>
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
	title: {
		position: 'absolute',
		left: PosX(17),
		top: PosY(602),
		width: PosX(358),
		textAlign: 'center',
		fontFamily: 'SF-Heavy',
		fontSize: 30,
		color: '#FFFFFF',
	},
	buttonContainer: {
		position: 'absolute',
		left: PosX(89),
		top: PosY(730),
	},
});
