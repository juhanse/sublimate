import React from 'react';
import { TouchableOpacity, FlatList, StyleSheet, ActivityIndicator, View } from 'react-native';
import { router } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Background } from '@/components/ui/Background';
import Header from '@/components/ui/Header';
import Button from '@/components/ui/Button';
import ProjectCard from '@/components/project/ProjectCard';
import { fetchMe } from '@/services/usersQueries';
import { fetchMeProjects, Project } from '@/services/projectsQueries';
import { PosX, PosY } from '@/constants/Responsive';
import * as Haptics from 'expo-haptics';

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
		await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
		router.push({ pathname: '/(tabs)/[id]', params: { id: projectId } });
	};

	const renderProject = ({ item }: { item: ProjectListItem }) => {
		if (item === 'add') {
			return (
				<TouchableOpacity style={styles.addIcon} onPress={handleCreate}>
					<LinearGradient
						colors={["#F77E75", "#ED5C5C"]}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 0 }}
						style={[styles.progressFill]}
					>
						<Ionicons name="add" size={32} color="#fff" />
					</LinearGradient>
				</TouchableOpacity>
			);
		}

		return (
			<View>
				<ProjectCard
					image={item.thumbnail}
					name={item.name}
					currentStep={item.steps.find(step => step.id === item.current_step)!.name}
					deadline={item.steps.find(step => step.id === item.current_step)!.deadline}
					onPress={() => handleDetails(item.id)}
				/>
			</View>
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
		<View style={{ flex: 1 }}>
			<Background />
			{userQuery.data && <Header user={userQuery.data} />}

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

			<View style={[styles.buttonContainer]}>
				<Button type="primary" onPress={handleCreate} children="✨ Sublimate" />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	buttonContainer: {
		width: '100%',
		position: 'absolute',
		top: PosY(750),
		flexDirection: 'column',
		paddingHorizontal: PosX(80),
	},
	progressFill: {
		width: "100%",
		height: "100%",
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: PosY(36),
	},
	addIcon: {
		width: PosX(290),
		height: PosY(430),
	},
	projectsList: {
		padding: 24,
		marginTop: 24,
		gap: 16,
	},
});
