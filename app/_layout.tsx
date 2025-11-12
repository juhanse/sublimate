import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';

const queryClient = new QueryClient();

const InitialLayout = () => {
	const { isAuth } = useAuth();

	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Protected guard={!isAuth}>
				<Stack.Screen name="(auth)" />
			</Stack.Protected>

			<Stack.Protected guard={isAuth}>
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
			<AuthProvider>
				<InitialLayout />
			</AuthProvider>
		</QueryClientProvider>
	);
}
