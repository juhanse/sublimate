import { View, Text, StyleSheet, Image } from 'react-native';
import { router } from 'expo-router';
import Button from '@/components/ui/Button';
import { PosX, PosY } from '@/constants/Responsive';
import { Background } from '@/components/ui/Background';

export default function AuthScreen() {
	return (
		<View style={{ flex: 1 }}>
			<Background />
			<Image source={require("@/assets/images/welcome.png")} style={styles.logo} />
			<Text style={styles.title}>
				Achieving your goals is just waiting for you
			</Text>
			<View style={[styles.buttonContainer]}>
				<Button type="primary" onPress={() => router.push('/(auth)/auth')}>
					Discover
				</Button>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
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
	logo: {
		position: 'absolute',
		left: PosX(0),
		top: PosY(100),
		width: '100%',
		height: PosY(475),
		transform: [{ rotate: '0.3deg' }],
		resizeMode: 'contain',
	},
	buttonContainer: {
		position: 'absolute',
		left: PosX(89),
		top: PosY(730),
	},
});
