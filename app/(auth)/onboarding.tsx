import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import { useOnboardingStore } from '@/contexts/OnboardingContext';

const OnboardingScreen = () => {
	const { markOnboardingSeen } = useOnboardingStore();

	return (
		<Swiper loop={false}>
			<View style={styles.container}>
				<ImageBackground
					source={require('@/assets/images/onboarding.jpg')}
					style={styles.image}
					resizeMode="cover"
				>
					<View style={styles.button}>
						<TouchableOpacity style={styles.skipButton} onPress={markOnboardingSeen}>
							<Text style={styles.text}>Passer</Text>
						</TouchableOpacity>
					</View>
				</ImageBackground>
			</View>
	
			<View style={styles.container}>
				<ImageBackground
					source={require('@/assets/images/onboarding.jpg')}
					style={styles.image}
					resizeMode="cover"
				/>
			</View>

			<View style={styles.container}>
				<ImageBackground
					source={require('@/assets/images/onboarding.jpg')}
					style={styles.image}
					resizeMode="cover"
				/>
			</View>

			<View style={styles.container}>
				<ImageBackground
					source={require('@/assets/images/onboarding.jpg')}
					style={styles.image}
					resizeMode="cover"
				>
					<View style={styles.button}>
						<TouchableOpacity style={styles.startButton} onPress={markOnboardingSeen}>
							<Text style={styles.text}>Commencer 🎉</Text>
						</TouchableOpacity>
					</View>
				</ImageBackground>
			</View>
		</Swiper>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f0f0f0',
	},
	image: {
		flex: 1,
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	button: {
		flex: 1,
		width: '100%',
		justifyContent: 'flex-end',
		paddingHorizontal: 20,
		paddingBottom: 40,
	},
	skipButton: {
		backgroundColor: 'rgba(255, 255, 255, 0.1)',
		paddingVertical: 16,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: 'rgba(255, 255, 255, 0.3)',
		marginBottom: 24,
	},
	startButton: {
		backgroundColor: '#007AFF',
		paddingVertical: 16,
		borderRadius: 12,
		marginBottom: 12,
		shadowColor: '#007AFF',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 8,
		elevation: 6,
	},
	text: {
		color: '#FFFFFF',
		fontSize: 18,
		fontWeight: '600',
		textAlign: 'center',
	},
});

export default OnboardingScreen;
