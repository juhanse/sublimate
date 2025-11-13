import { View, Text, StyleSheet, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import Button from '@/components/ui/Button';
import { PosX, PosY } from '@/constants/Responsive';
import { Background } from '@/components/ui/Background';
import * as Haptics from 'expo-haptics';

const handleGoogleSignIn = async () => {
	await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
};

const handleAppleSignIn = async () => {
	await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
};

/* const slides = [
	{
		key: 'slide1',
		image: require('@/assets/auth/slide1.png'),
	},
	{
		key: 'slide2',
		image: require('@/assets/auth/slide2.png'),
	},
	{
		key: 'slide3',
		image: require('@/assets/auth/slide3.png'),
	},
	{
		key: 'slide4',
		image: require('@/assets/auth/slide4.png'),
	}
]; */

export default function AuthScreen() {
	return (
		<View style={{ flex: 1 }}>
			<Background />
			<View style={[styles.buttonContainer]}>
				<Button type="primary" onPress={handleGoogleSignIn}>
					Sign in with Google
				</Button>
				<Button type="primary" onPress={handleAppleSignIn}>
					Sign in with Apple
				</Button>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	buttonContainer: {
		width: '100%',
		position: 'absolute',
		top: PosY(650),
		flexDirection: 'column',
		gap: PosY(20),
		paddingHorizontal: PosX(20),
	},
});
