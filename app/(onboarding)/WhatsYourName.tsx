import { View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Background } from '@/components/ui/Background';
import Button from '@/components/ui/Button';
import { PosX, PosY } from '@/constants/Responsive';
import { useOnboardingStore } from '@/contexts/OnboardingStore';

export default function WhatsYourNameScreen() {
	const { t } = useTranslation();
	const { nextStep, previousStep } = useOnboardingStore();

	return (
		<View style={{ flex: 1 }}>
			<Background />

			<View style={styles.container}>
				<Text style={styles.title}>
					{t('whatsyourname')}
				</Text>
			</View>

			<View style={[styles.buttonContainer]}>
				<Button type="primary" onPress={nextStep}>
					{t('next')}
				</Button>
				<Text style={styles.backButton} onPress={previousStep}>
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
