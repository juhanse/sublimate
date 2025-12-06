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
import Progress from '@/components/onboarding/Progress';
import CardGrid, { CardItem } from '@/components/onboarding/CardGrid';

export default function OnboardingScreen() {
	const { t } = useTranslation();
	const [profileType, setProfileType] = useState<"student" | "sports" | "artist" | "entrepreneur" | "other" | null>(null);
	const cardData: CardItem[] = [
		{ label: t('student'), value: 'student' },
		{ label: t('sports'), value: 'sports' },
		{ label: t('artist'), value: 'artist' },
		{ label: t('entrepreneur'), value: 'entrepreneur' },
		{ label: t('other'), value: 'other' },
	];

	const { mutate, isPending } = useMutation({
		mutationFn: (user: UpdateUser) => updateMe(user),
		onSuccess: () => {
			router.push('/(onboarding)/WhatsYourName');
		},
		onError: (error) => {
			console.error(error);
		},
	});

	const handleNext = async () => {
		await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
		if (profileType !== null) {
			mutate({ profile_type: profileType });
		}
	};

	return (
		<View style={{ flex: 1 }}>
			<Background />

			<View style={styles.container}>
				<Progress progress={0.25} />
		
				<Text style={styles.title}>
					{t('whoareyou')}
				</Text>

				<CardGrid
					items={cardData}
					onSelectionChange={(values) => {
						setProfileType(values ? (values[0] as "student" | "sports" | "artist" | "entrepreneur" | "other") : null);
					}}
				/>
			</View>

			<View style={[styles.buttonContainer]}>
				<Button type="primary" onPress={handleNext} pending={isPending} disabled={profileType === null}>
					{t('next')}
				</Button>
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
