import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';';
import { useQuery } from '@tanstack/react-query';
import { fetchMeProjectById } from '@/services/projectsQueries';
import { router, useLocalSearchParams } from 'expo-router';
import * as Haptics from 'expo-haptics';

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
		<SafeAreaView style={styles.container}>
			<Header title={projectQuery.data?.name!} onPress={handleBack} />

			<View>
				<Text style={{ color: "white" }}>
					Catégories :
					{projectQuery.data?.projects_categories.map((item) => (
						<Text key={item.categories.id} style={styles.categoryText}>
							{item.categories.name}
						</Text>
					))}
				</Text>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#352940ff',
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 16,
		paddingVertical: 12,
		paddingTop: 16,
	},
	headerTitle: {
		fontSize: 24,
		fontFamily: 'Borna',
		color: 'white',
	},
	placeholder: {
		width: 40,
	},
	backButton: {
		padding: 8,
	},
	categoryText: {
		color: 'white',
		fontFamily: 'Mona',
		fontSize: 12,
		fontWeight: 'bold',
	},
});
