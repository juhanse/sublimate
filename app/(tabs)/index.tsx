import React from 'react';
import { FlatList, StyleSheet, SafeAreaView, ActivityIndicator, View } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { fetchMe } from '@/services/usersQueries';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProjectCard from '@/components/profile/ProjectCard';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

export default function HomeScreen() {
	const projects = [1, 2, 3, 'add'];
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ['currentUser'],
		queryFn: fetchMe,
	});

	const handleCreate = async () => {
		await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
	};

	const handleValidate = async () => {
		await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
	};

	if (isLoading) {
		return <ActivityIndicator color="white" size="small" />;
	}

	return (
		<SafeAreaView style={styles.container}>
			<ProfileHeader user={data!} />
			<FlatList
				data={projects}
				keyExtractor={(item, idx) => item === 'add' ? 'add' : String(item)}
				renderItem={({ item }) => {
					if (item === 'add') {
						return (
							<View style={styles.addIcon}>
								<Ionicons name="add" size={32} color="#fff" onPress={handleCreate} />
							</View>
						);
					}
					return (
						<ProjectCard 
							name={`Révoner ma chambre #${item}`}
							thumbnail='https://images.pexels.com/photos/32603590/pexels-photo-32603590.jpeg'
							onValidate={handleValidate}
						/>
					);
				}}
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.projectsList}
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
		flex: 1,
		padding: 24,
		marginTop: 24,
	},
	addIcon: {
		width: 80,
		height: 80,
		borderRadius: 40,
		backgroundColor: '#7c5fff',
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		shadowColor: '#7c5fff',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 8,
		elevation: 4,
	},
});
