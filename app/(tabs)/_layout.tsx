import React, { useState } from 'react';
import { Stack } from 'expo-router';

export default function TabsLayout() {
	const [isPremium, setIsPremium] = useState(false);

	return (
		<Stack screenOptions={{ headerShown: false }}>
			<Stack.Screen name="index" />
			<Stack.Screen name="camera" />
			<Stack.Screen name="profile" />
			<Stack.Screen name="settings" />
			<Stack.Screen name="[id]/index" />
			<Stack.Screen name="[id]/settings" />

			<Stack.Screen name="create" options={{ presentation: 'modal', contentStyle: { backgroundColor: 'transparent' } }} />
		</Stack>
	);
}
