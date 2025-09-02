import React from 'react';
import { TouchableOpacity, FlatList, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { fetchMe } from '@/services/usersQueries';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProjectCard from '@/components/profile/ProjectCard';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { fetchMeProjects, Project } from '@/services/projectsQueries';
import { router } from 'expo-router';

type ProjectListItem = Project | 'add';

export default function HomeScreen() {
	const userQuery = useQuery({
		queryKey: ['currentUser'],
		queryFn: fetchMe,
	});

	const projectsQuery = useQuery({
		queryKey: ['projects', 'active'],
		queryFn: () => fetchMeProjects('active'),
	});

	const handleCreate = async () => {
		await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
		router.push('/(tabs)/create');
	};

	const handleDetails = async (projectId: string) => {
		await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
		router.push({ pathname: '/(tabs)/[id]', params: { id: projectId } });
	};

	const handleValidate = async (projectId: string) => {
		await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
		console.log(`Validate project with ID: ${projectId}`);
	};

	const renderProject = ({ item }: { item: ProjectListItem }) => {
		if (item === 'add') {
			return (
				<TouchableOpacity style={styles.addIcon} onPress={handleCreate}>
					<Ionicons name="add" size={32} color="#fff" />
				</TouchableOpacity>
			);
		}

		return (
			<ProjectCard 
				data={item}
				onPress={() => handleDetails(item.id)}
				onValidate={() => handleValidate(item.id)}
			/>
		);
	};

	const getKeyExtractor = (item: ProjectListItem, index: number) => {
		return item === 'add' ? 'add' : item.id;
	};

	if (userQuery.isLoading || projectsQuery.isLoading) {
		return <ActivityIndicator color="white" size="small" />;
	}

	const projectsData: ProjectListItem[] = projectsQuery.data ? [...projectsQuery.data, 'add'] : ['add'];

	return (
		<SafeAreaView style={styles.container}>
			<ProfileHeader user={userQuery.data!} />

			<FlatList
				data={projectsData}
				keyExtractor={getKeyExtractor}
				renderItem={renderProject}
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.projectsList}
				initialNumToRender={5}
				maxToRenderPerBatch={3}
				windowSize={5}
				bounces={false}
				alwaysBounceVertical={false}
			/>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#352940ff',
	},
	projectsList: {
		padding: 24,
		marginTop: 24,
		gap: 16,
	},
	addIcon: {
		width: 280,
		height: 400,
		borderRadius: 40,
		backgroundColor: '#7c5fff',
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 20,
		shadowColor: '#7c5fff',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 8,
		elevation: 4,
	},
});
