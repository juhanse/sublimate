import React, { useState } from 'react';
import { Stack } from 'expo-router';

export default function TabsLayout() {
	const [isPremium, setIsPremium] = useState(true);

	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="index" />
			<Stack.Screen name="settings" />

			<Stack.Protected guard={isPremium}>
				<Stack.Screen name="create" options={{ presentation: 'modal', contentStyle: { backgroundColor: 'transparent' } }} />
			</Stack.Protected>
		</Stack>
	);
}
