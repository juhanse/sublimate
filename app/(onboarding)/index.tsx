import React from 'react';
import { View } from 'react-native';
import { useOnboardingStore } from '@/contexts/OnboardingStore';
import WhoAreYou from '@/app/(onboarding)/WhoAreYou';
import HowOldAreYou from '@/app/(onboarding)/HowOldAreYou';

export default function OnboardingScreen() {
	const { step } = useOnboardingStore();

	const renderStep = () => {
		switch (step) {
			case 1:
				return <WhoAreYou />;
			case 2:
				return <HowOldAreYou />;
			default:
				return <WhoAreYou />;
		}
	};

	return (
		<View style={{ flex: 1 }}>
			{renderStep()}
		</View>
	);
}
