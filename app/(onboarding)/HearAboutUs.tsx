import { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
import { updateMe, UpdateUser } from '@/services/usersQueries';
import { useTranslation } from 'react-i18next';
import { Background } from '@/components/ui/Background';
import Button from '@/components/ui/Button';
import { PosX, PosY } from '@/constants/Responsive';
import * as Haptics from 'expo-haptics';
import { useAuth } from '@/contexts/auth';
import Progress from '@/components/onboarding/Progress';

export default function HearAboutUsScreen() {
	const { setOnboarded } = useAuth();
	const { t } = useTranslation();
	const [hear, setHear] = useState<"internet" | "app_store" | "social_network" | "friends" | "other" | null>(null);

	const { mutate, isPending } = useMutation({
        mutationFn: (user: UpdateUser) => updateMe(user),
        onSuccess: () => {
			setOnboarded(true);
        },
        onError: (error) => {
            console.error(error);
        },
    });

	const handleBack = async () => {
		await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
		router.back();
	};

	const handleFinish = async () => {
		await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
		mutate({ heard: "friends", onboarding: true });
	};

	return (
		<View style={{ flex: 1 }}>
			<Background />

			<View style={styles.container}>
				<Progress progress={1} />

				<Text style={styles.title}>
					{t('hearaboutus')}
				</Text>
			</View>

			<View style={[styles.buttonContainer]}>
				<Button type="primary" onPress={handleFinish} disabled={isPending}>
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
		justifyContent: 'flex-start',
		alignItems: 'center',
		gap: PosY(40),
		paddingTop: PosY(80),
		paddingHorizontal: PosX(40),
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
