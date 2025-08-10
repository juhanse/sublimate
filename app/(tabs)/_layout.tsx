import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { router, Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';

export default function TabLayout() {
  	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: Colors.purple,
				tabBarStyle: styles.tabBarStyle,
				tabBarBackground: TabBarBackground,
				tabBarButton: HapticTab,
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: 'Accueil',
					tabBarIcon: ({ color }) => (
						<Ionicons name="home" size={24} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="create-placeholder"
				options={{
					title: '',
					tabBarIcon: ({ color }) => (
						<Ionicons name="add" size={32} color={color} />
					),
					tabBarButton: (props) => (
						<TouchableOpacity
							{...(props as any)}
							onPress={() => router.push('/create2')}
						/>
					)
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: 'Profil',
					tabBarIcon: ({ color }) => (
						<Ionicons name="person" size={24} color={color} />
					),
				}}
			/>
			<Tabs.Screen name="settings" options={{ href: null }} />
		</Tabs>
  	);
}

const styles = StyleSheet.create({
	tabBarStyle: {
		position: 'absolute',
		bottom: 0,
		elevation: 0,
		shadowOpacity: 0,
		borderTopWidth: 0,
		paddingTop: 10,
	},
});
