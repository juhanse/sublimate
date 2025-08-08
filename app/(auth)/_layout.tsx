import { Stack, Redirect } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';

export default function AuthLayout() {
	/* const { user } = useAuth();

	if (user) {
		return <Redirect href="/(tabs)" />;
	} */

	return (
		<Stack>
			<Stack.Screen name="index" options={{ headerShown: false }} />
			<Stack.Screen name="login" options={{ headerShown: false, presentation: 'modal' }} />
			<Stack.Screen name="register" options={{ headerShown: false }} />
			<Stack.Screen name="onboarding" options={{ headerShown: false }} />
		</Stack>
	);
}
