import { View, Text, StyleSheet } from 'react-native';
import { useMutation } from '@tanstack/react-query';
import { updateMe, UpdateUser } from '@/services/usersQueries';
import { useTranslation } from 'react-i18next';
import { Background } from '@/components/ui/Background';
import Button from '@/components/ui/Button';
import { PosX, PosY } from '@/constants/Responsive';
import * as Haptics from 'expo-haptics';
import { router } from 'expo-router';
import { useState } from 'react';

export default function OnboardingScreen() {
	const { t } = useTranslation();
	const [profileType, setProfileType] = useState<"student" | "sports" | "artist" | "entrepreneur" | "other" | null>(null);

	const { mutate, isPending } = useMutation({
		mutationFn: (user: UpdateUser) => updateMe(user),
		onSuccess: () => {
			router.push('/(onboarding)/HowOldAreYou');
		},
		onError: (error) => {
			console.error(error);
		},
	});

	const handleNext = async () => {
		await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
		if (!profileType) {
			return;
		}
		mutate({ profile_type: "student" });
	};

	return (
		<View style={{ flex: 1 }}>
			<Background />

			<View style={styles.container}>
				<Text style={styles.title}>
					{t('whoareyou')}
				</Text>
			</View>

			<View style={[styles.buttonContainer]}>
				<Button type="primary" onPress={handleNext} disabled={isPending}>
					{t('next')}
				</Button>
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
