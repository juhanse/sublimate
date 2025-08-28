import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import CreateProjectButton from '@/components/ui/CreateProjectButton';
import { useQuery } from '@tanstack/react-query';
import { fetchMe } from '@/services/usersQueries';
import ProfileH from '@/components/index/ProfileH';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import ProjectCard from '@/components/index/ProjectCard';

export default function Home2Screen() {
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
			<ProfileH user={data!} />
			<ScrollView 
				style={styles.scrollView}
				horizontal={true}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.scrollContent}
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
		backgroundColor: '#22162dff',
	},
	scrollView: {
		flex: 1,
		padding: 24,
	},
	scrollContent: {
		paddingVertical: 30,
	},
	projectsContainer: {
		padding: 120,
		borderRadius: 40,
		backgroundColor: '#FFFFFF',
	},
});
