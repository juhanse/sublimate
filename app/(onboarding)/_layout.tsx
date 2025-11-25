import { Stack } from 'expo-router';

export default function OnboardingLayout() {
	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="index" />
			<Stack.Screen name="HowOldAreYou" />
			<Stack.Screen name="WhatsYourName" />
			<Stack.Screen name="HearAboutUs" />
		</Stack>
	);
}
