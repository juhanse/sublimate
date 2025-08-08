import { Stack, Redirect } from 'expo-router';
import { useAuth } from '@/hooks/useAuth';

export default function AuthLayout() {
	/* const { user } = useAuth();

	if (user) {
		return <Redirect href="/(tabs)" />;
	} */

	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="index" />
			<Stack.Screen name="login" options={{ presentation: 'modal' }} />
			<Stack.Screen name="register" />
			<Stack.Screen name="onboarding" />
		</Stack>
	);
}
