import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Pressable } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { fetchMeProjectById } from '@/services/projectsQueries';
import { router, useLocalSearchParams } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { PosX } from '@/constants/Responsive';
import { Entypo } from '@expo/vector-icons';
import { Background } from '@/components/ui/Background';
import Button from '@/components/ui/Button';

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
		<View style={styles.container}>
			<Background url={projectQuery.data?.thumbnail}/>

			<Pressable style={styles.back} onPress={handleBack}>
				<Entypo name="chevron-left" size={PosX(30)} color="#D9D9D9" />
			</Pressable>

			<Text style={styles.title}>{projectQuery.data?.name}</Text>
			<View style={styles.buttonContainer}>
				<Button type='warning' onPress={() => router.push(`/project/${projectId}/edit`)}>
					Supprimer
				</Button>
				<Button type='primary' onPress={() => {}}>
					Sauvegarder
				</Button>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		paddingHorizontal: PosX(20),
	},
	back: {
		position: 'absolute',
		top: PosX(70),
		left: PosX(50),
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
	buttonContainer: {
		position: 'absolute',
		bottom: PosX(50),
		width: '100%',
		gap: PosX(15),
	},
});
