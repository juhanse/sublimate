import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/hooks/useTranslation';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { useOnboardingStore } from '@/contexts/onboarding';
import { useAuth } from '@/contexts/auth';

const queryClient = new QueryClient();

const InitialLayout = () => {
	const { isAuth } = useAuth();
  	const { completed } = useOnboardingStore();

	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Protected guard={!isAuth}>
				<Stack.Screen name="(auth)" />
			</Stack.Protected>

			<Stack.Protected guard={!completed}>
				<Stack.Screen name="(onboarding)" />
			</Stack.Protected>

			<Stack.Protected guard={isAuth && completed}>
				<Stack.Screen name="(tabs)" />
			</Stack.Protected>

			<Stack.Screen name="+not-found" />
		</Stack>
	)
}

export default function RootLayout() {
	const [loaded] = useFonts({
		"Borna": require('@/assets/fonts/Borna-Bold.otf'),
		"SF-Black": require('@/assets/fonts/SF-Pro-Display-Black.otf'),
		"SF-Bold": require('@/assets/fonts/SF-Pro-Display-Bold.otf'),
		"SF-Heavy": require('@/assets/fonts/SF-Pro-Display-Heavy.otf'),
		"SF-Medium": require('@/assets/fonts/SF-Pro-Display-Medium.otf'),
		"SF-Regular": require('@/assets/fonts/SF-Pro-Display-Regular.otf'),
		"SF-Semibold": require('@/assets/fonts/SF-Pro-Display-Semibold.otf'),
	});

	if (!loaded) {
		return null;
	}

	return (
		<QueryClientProvider client={queryClient}>
			<I18nextProvider i18n={i18n}>
				<InitialLayout />
			</I18nextProvider>
		</QueryClientProvider>
	);
}
