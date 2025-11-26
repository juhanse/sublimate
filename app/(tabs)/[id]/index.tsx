import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Pressable } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { fetchMeProjectById } from '@/services/projectsQueries';
import { router, useLocalSearchParams } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { PosX } from '@/constants/Responsive';
import { Entypo } from '@expo/vector-icons';
import { Background } from '@/components/ui/Background';

export default function ProjectScreen() {
	const { id } = useLocalSearchParams();
	const projectId = id as string;

	const projectQuery = useQuery({
		queryKey: ['projectId', projectId],
		queryFn: () => fetchMeProjectById(projectId),
	});

	const handleBack = async () => {
		await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
		router.back();
	};

	if (projectQuery.isLoading) {
		return <ActivityIndicator color="white" size="small" />;
	}

	return (
		<View style={{ flex: 1}}>
			<Background />

			<Pressable style={styles.back} onPress={handleBack}>
				<Entypo name="chevron-left" size={PosX(35)} color="#D9D9D9" />
			</Pressable>

			<Text style={styles.title}>{projectQuery.data?.name}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	back: {
		position: 'absolute',
		top: PosX(80),
		left: PosX(40),
		zIndex: 10,
	},
	title: {
		marginTop: PosX(150),
		marginBottom: PosX(30),
		fontSize: PosX(28),
		fontFamily: 'SF-Semibold', 
		fontWeight: '600',
		color: '#FFFFFF',
		textAlign: 'center',
	},
});
