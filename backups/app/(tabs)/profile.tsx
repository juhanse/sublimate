import React, { useState } from 'react';
import { StyleSheet, ScrollView, SafeAreaView, Alert, ActivityIndicator } from 'react-native';
import ProfileHeader from '@/components/profile/ProfileHeader';
import StatsGrid from '@/components/profile/StatsGrid';
import ProjectsList from '@/components/profile/ProjectsList';
import TrophiesList from '@/components/profile/TrophiesList';
import { useQuery } from '@tanstack/react-query';
import { fetchMe } from '@/services/usersQueries';

export interface UserStats {
	projectsCompleted: number;
	totalHours: number;
	trophiesEarned: number;
	activeDays: number;
}

export interface Project {
	id: string;
	title: string;
	completedDate: string;
	category: string;
	status: 'completed' | 'archived';
}

export interface Trophy {
	id: string;
	name: string;
	icon: string;
	description: string;
	earnedDate: string;
	rarity: 'bronze' | 'silver' | 'gold' | 'diamond';
}

export default function ProfileScreen() {
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ['currentUser'],
		queryFn: fetchMe,
	});

	const [userStats] = useState<UserStats>({
		projectsCompleted: 24,
		totalHours: 156,
		trophiesEarned: 8,
		activeDays: 45,
	});

	const [projects] = useState<Project[]>([
		{
			id: '1',
			title: 'Application E-commerce',
			completedDate: '2024-12-15',
			category: 'Développement',
			status: 'completed',
		},
		{
			id: '2',
			title: 'Site Portfolio',
			completedDate: '2024-12-10',
			category: 'Design',
			status: 'completed',
		},
		{
			id: '3',
			title: 'API REST',
			completedDate: '2024-12-05',
			category: 'Backend',
			status: 'completed',
		},
	]);

	const [trophies] = useState<Trophy[]>([
		{
			id: '1',
			name: 'Premier Projet',
			icon: 'trophy',
			description: 'Complétez votre premier projet',
			earnedDate: '2024-11-20',
			rarity: 'bronze',
		},
		{
			id: '2',
			name: 'Série de 7',
			icon: 'flame',
			description: '7 jours consécutifs d\'activité',
			earnedDate: '2024-11-25',
			rarity: 'silver',
		},
		{
			id: '3',
			name: 'Maître du Code',
			icon: 'code-slash',
			description: '100 heures de développement',
			earnedDate: '2024-12-01',
			rarity: 'gold',
		},
		{
			id: '4',
			name: 'Perfectionniste',
			icon: 'star',
			description: '10 projets sans erreur',
			earnedDate: '2024-12-10',
			rarity: 'diamond',
		},
	]);

	const handleAvatarEdit = () => {
		Alert.alert(
			'Modifier l\'avatar',
			'Choisissez une option',
			[
				{ text: 'Appareil photo', onPress: () => console.log('Camera') },
				{ text: 'Galerie', onPress: () => console.log('Gallery') },
				{ text: 'Annuler', style: 'cancel' },
			]
		);
	};

	const handleProjectDownload = (project: Project) => {
		Alert.alert(
			'Télécharger le projet',
			`Voulez-vous télécharger "${project.title}" ?`,
			[
				{ text: 'Annuler', style: 'cancel' },
				{ text: 'Télécharger', onPress: () => console.log('Download', project.id) },
			]
		);
	};

	if (isLoading) {
		return <ActivityIndicator color="white" size="small" />;
	}

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView 
				style={styles.scrollView}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.scrollContent}
			>
				<ProfileHeader user={data!} onAvatarEdit={handleAvatarEdit} />
				<StatsGrid stats={userStats} />
				<TrophiesList trophies={trophies} />
				<ProjectsList projects={projects} onProjectDownload={handleProjectDownload} />
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F8F9FA',
	},
	headerGradient: {
		height: 120,
		justifyContent: 'flex-end',
		paddingBottom: 16,
		paddingHorizontal: 16,
	},
	logoutButton: {
		alignSelf: 'flex-end',
		backgroundColor: 'rgba(255, 255, 255, 0.2)',
		paddingHorizontal: 16,
		paddingVertical: 8,
		borderRadius: 20,
		borderWidth: 1,
		borderColor: 'rgba(255, 255, 255, 0.3)',
	},
	logoutText: {
		color: '#FFFFFF',
		fontSize: 14,
		fontWeight: '500',
	},
	scrollView: {
		flex: 1,
		paddingTop: 66,
	},
	scrollContent: {
		paddingBottom: 32,
	},
});
