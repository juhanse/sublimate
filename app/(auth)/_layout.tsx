import { Stack } from 'expo-router';
import { useOnboarding } from '@/contexts/OnboardingContext';

export default function AuthLayout() {
	const { seenOnboarding } = useOnboarding();

	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Protected guard={!seenOnboarding}>
				<Stack.Screen name="onboarding" />
			</Stack.Protected>

			<Stack.Protected guard={seenOnboarding}>
				<Stack.Screen name="index" />
				<Stack.Screen name="login" options={{ presentation: 'modal' }} />
				<Stack.Screen name="register" />
			</Stack.Protected>
		</Stack>
	);
}
