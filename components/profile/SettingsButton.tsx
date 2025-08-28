import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '@/constants/Colors';
import { router } from 'expo-router';
import { Entypo } from '@expo/vector-icons';

export default function SettingsButton() {
	const handlePress = async () => {
		router.push("/settings");
	};

	return (
		<TouchableOpacity style={styles.button} onPress={handlePress}>
			<Entypo name="dots-three-vertical" size={18} color="gray" />
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	button: {
		width: 42,
		height: 42,
		borderRadius: 21,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: "white",
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 4,
		shadowOpacity: 0.3,
		elevation: 2,
	}
});
