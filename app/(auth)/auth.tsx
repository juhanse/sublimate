import { View, Image, StyleSheet } from 'react-native';
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

const slides = [
	{
		key: 'slide1',
		image: require('@/assets/images/background.png'),
	},
	{
		key: 'slide2',
		image: require('@/assets/images/background.png'),
	},
	{
		key: 'slide3',
		image: require('@/assets/images/background.png'),
	},
	{
		key: 'slide4',
		image: require('@/assets/images/background.png'),
	}
];

export default function AuthScreen() {
	return (
		<View style={{ flex: 1 }}>
			<Background />
			
			<View style={styles.carouselContainer}>
				<Swiper
					showsButtons={false}
					autoplay
					autoplayTimeout={3}
					dotColor="rgba(255,255,255,0.3)"
					activeDotColor="#FFFFFF"
					paginationStyle={styles.pagination}
				>
					{slides.map((slide) => (
						<View key={slide.key} style={styles.slide}>
							<Image source={slide.image} style={styles.image} />
						</View>
					))}
				</Swiper>
			</View>
			
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
	carouselContainer: {
		position: 'absolute',
		top: PosY(80),
		left: 0,
		width: '100%',
		height: PosY(530),
		paddingHorizontal: PosX(40),
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	slide: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		width: '100%',
		height: '100%',
		borderRadius: 30,
		resizeMode: 'cover',
	},
	pagination: {
		position: 'absolute',
		bottom: 0,
		height: PosY(50),
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonContainer: {
		width: '100%',
		position: 'absolute',
		top: PosY(650),
		flexDirection: 'column',
		gap: PosY(20),
		paddingHorizontal: PosX(40),
	},
});
