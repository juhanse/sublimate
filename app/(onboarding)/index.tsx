import React from 'react';
import { View } from 'react-native';
import { useOnboardingStore } from '@/contexts/OnboardingStore';
import WhoAreYouScreen from '@/app/(onboarding)/WhoAreYou';
import HowOldAreYouScreen from '@/app/(onboarding)/HowOldAreYou';
import ProjectTypeScreen from '@/app/(onboarding)/ProjectType';
import WhatsYourNameScreen from '@/app/(onboarding)/WhatsYourName';
import HearAboutUsScreen from '@/app/(onboarding)/HearAboutUs';

export default function OnboardingScreen() {
	const { step } = useOnboardingStore();

	const renderStep = () => {
		switch (step) {
			case 1:
				return <WhoAreYouScreen />;
			case 2:
				return <HowOldAreYouScreen />;
			case 3:
				return <ProjectTypeScreen />;
			case 4:
				return <WhatsYourNameScreen />;
			case 5:
				return <HearAboutUsScreen />;
			default:
				return <WhoAreYouScreen />;
		}
	};

	return (
		<View style={{ flex: 1 }}>
			{renderStep()}
		</View>
	);
}
