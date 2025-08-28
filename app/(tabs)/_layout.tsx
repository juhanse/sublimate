import React from 'react';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarStyle: { display: "none" },
			}}
		>
			<Tabs.Screen name="index" options={{ href: null }} />
			<Tabs.Screen name="create-placeholder" options={{ href: null }} />
			<Tabs.Screen name="profile" options={{ href: null }} />
			<Tabs.Screen name="settings" options={{ href: null }} />
		</Tabs>
  	);
}
