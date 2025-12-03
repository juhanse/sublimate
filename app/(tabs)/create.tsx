import React, { useState } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProject } from '@/services/projectsQueries';
import { Colors } from '@/constants/Colors';
import { PosX } from '@/constants/Responsive';
import * as Haptics from 'expo-haptics';

export default function CreateProjectModal() {
	const queryClient = useQueryClient();

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
		>
			<View style={styles.categoryContainer}>
				<Text style={styles.label}>Catégories :</Text>
			</View>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		borderRadius: PosX(80),
	},
	label: {
		fontSize: 18,
		fontFamily: 'Borna',
		color: 'white',
		marginBottom: 8,
	},
	categoryContainer: {
		marginTop: 40,
		paddingHorizontal: 24,
	},
});
