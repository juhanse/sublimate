import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';

import { useColorScheme } from '@/hooks/useColorScheme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

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
	const colorScheme = useColorScheme();
	const [loaded] = useFonts({
		Mona: require('@/assets/fonts/MonaSans-Bold.ttf'),
		Borna: require('@/assets/fonts/Borna-Bold.otf'),
		SpaceMono: require('@/assets/fonts/SpaceMono-Regular.ttf'),
	});

	if (!loaded) {
		return null;
	}

	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
				<GestureHandlerRootView style={{ flex: 1 }}>
					<AuthProvider>
						<InitialLayout />
					</AuthProvider>
				</GestureHandlerRootView>
			</ThemeProvider>
		</QueryClientProvider>
	);
}
