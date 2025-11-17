import { JSX } from 'react';
import { View } from 'react-native';
import { useOnboardingStore } from '@/contexts/onboarding';
import WhoAreYouScreen from '@/app/(onboarding)/WhoAreYou';
import HowOldAreYouScreen from '@/app/(onboarding)/HowOldAreYou';
import ProjectTypeScreen from '@/app/(onboarding)/ProjectType';
import WhatsYourNameScreen from '@/app/(onboarding)/WhatsYourName';
import HearAboutUsScreen from '@/app/(onboarding)/HearAboutUs';

export default function OnboardingScreen() {
	const { step, finish } = useOnboardingStore();

	if (step > 5) {
		finish();
		return null;
	}

	const screens: Record<number, JSX.Element> = {
		1: <WhoAreYouScreen />,
		2: <HowOldAreYouScreen />,
		3: <ProjectTypeScreen />,
		4: <WhatsYourNameScreen />,
		5: <HearAboutUsScreen />,
	};

	return <View style={{ flex: 1 }}>{screens[step]}</View>;
}
