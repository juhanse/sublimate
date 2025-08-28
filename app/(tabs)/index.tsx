import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { fetchMe } from '@/services/usersQueries';
import ProfileHeader from '@/components/profile/ProfileHeader';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import ProjectCard from '@/components/profile/ProjectCard';

export default function HomeScreen() {
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ['currentUser'],
		queryFn: fetchMe,
	});

	const handleCreateProject = async () => {
		await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
	};

	if (isLoading) {
		return <ActivityIndicator color="white" size="small" />;
	}

	return (
		<SafeAreaView style={styles.container}>
			<ProfileHeader user={data!} />
			<ScrollView 
				style={styles.scrollView}
				horizontal={true}
				showsVerticalScrollIndicator={false}
			>
				<ProjectCard />
				<ProjectCard />
				<ProjectCard />
				<Ionicons name="add" size={24} color="white" onPress={handleCreateProject} />
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#18111fff',
	},
	scrollView: {
		flex: 1,
		padding: 24,
		marginTop: 24,
	},
	projectsContainer: {
		padding: 120,
		borderRadius: 40,
		backgroundColor: '#FFFFFF',
	},
});
