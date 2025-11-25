import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Background } from '@/components/ui/Background';
import Button from '@/components/ui/Button';
import { PosX, PosY } from '@/constants/Responsive';
import * as Haptics from 'expo-haptics';

export default function HowOldAreYouScreen() {
	const { t } = useTranslation();

	const handleBack = async () => {
		await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
		router.push('/(onboarding)/index');
	};

	const handleNext = async () => {
		await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
		router.push('/(onboarding)/ProjectType');
	};

	return (
		<View style={{ flex: 1 }}>
			<Background />

			<View style={styles.container}>
				<Text style={styles.title}>
					{t('howoldareyou')}
				</Text>
			</View>

			<View style={[styles.buttonContainer]}>
				<Button type="primary" onPress={handleNext}>
					{t('next')}
				</Button>
				<Text style={styles.backButton} onPress={handleBack}>
					{t('back')}
				</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: PosX(20),
	},
	title: {
		fontFamily: 'SF-Bold',
		fontSize: 32,
		color: 'white',
		textAlign: 'center',
	},
	buttonContainer: {
		width: '100%',
		position: 'absolute',
		top: PosY(700),
		flexDirection: 'column',
		paddingHorizontal: PosX(80),
	},
	backButton: {
		fontFamily: 'SF-Regular',
		fontSize: 16,
		color: 'rgba(255, 255, 255, 0.6)',
		textAlign: 'center',
		paddingVertical: PosY(20),
	},
});
