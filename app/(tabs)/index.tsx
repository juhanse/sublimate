import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Alert } from 'react-native';
import StreakCalendar from '@/components/Calendar';
import CreateProjectButton from '@/components/ui/CreateProjectButton';

export default function HomeScreen() {
	const [completedDays, setCompletedDays] = useState<number[]>([0, 1, 3, 5]);
	const [streakCount, setStreakCount] = useState(12);

	const handleDayPress = (dayIndex: number) => {
		const today = new Date();
		const currentDay = today.getDay();
		const mondayIndex = currentDay === 0 ? 6 : currentDay - 1;

		if (dayIndex === mondayIndex) {
			if (completedDays.includes(dayIndex)) {
				Alert.alert(
					'Déjà complété !',
					'Vous avez déjà effectué votre action aujourd\'hui. Revenez demain !'
				);
			} else {
				setCompletedDays(prev => [...prev, dayIndex]);
				setStreakCount(prev => prev + 1);

				Alert.alert(
					'Bravo ! 🔥',
					'Vous avez complété votre objectif du jour !',
					[{ text: 'Super !', style: 'default' }]
				);
			}
		} else if (dayIndex > mondayIndex) {
			Alert.alert(
				'Patience !',
				'Vous ne pouvez pas encore compléter les jours futurs.'
			);
		} else {
			Alert.alert(
				'Jour passé',
				'Ce jour est déjà passé. Concentrez-vous sur aujourd\'hui !'
			);
		}
	};

	const handleCreateProject = () => {
		Alert.alert(
			"Nouveau Projet",
			"Fonctionnalité de création de projet",
			[{ text: "OK" }]
		);
	};

	return (
		<SafeAreaView style={styles.container}>
			<StreakCalendar
				completedDays={completedDays}
				streakCount={streakCount}
				onDayPress={handleDayPress}
			/>
			<ScrollView 
				style={styles.scrollView}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.scrollContent}
			>
				<View style={styles.mainContent}>
					<View style={styles.welcomeSection}>
						<Text style={styles.welcomeText}>
						Salut Julien ! 👋
						</Text>
						<Text style={styles.motivationText}>
						Continuez votre excellent travail !
						</Text>
					</View>

					<View style={styles.placeholder}>
						<Text style={styles.placeholderText}>
						Contenu principal de ton écran d'accueil
						</Text>
					</View>
				</View>
			</ScrollView>
			<CreateProjectButton onPress={handleCreateProject} />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F8F9FA',
	},
	scrollView: {
		flex: 1,
	},
	scrollContent: {
		paddingBottom: 20,
	},
	mainContent: {
		flex: 1,
		paddingHorizontal: 16,
	},
	welcomeSection: {
		marginVertical: 20,
	},
	welcomeText: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#1D1D1F',
		marginBottom: 4,
	},
	motivationText: {
		fontSize: 16,
		color: '#8E8E93',
	},
	placeholder: {
		backgroundColor: '#FFFFFF',
		borderRadius: 12,
		padding: 20,
		marginTop: 16,
		alignItems: 'center',
		justifyContent: 'center',
		minHeight: 200,
		borderWidth: 1,
		borderColor: '#F2F2F7',
	},
	placeholderText: {
		fontSize: 16,
		color: '#8E8E93',
		textAlign: 'center',
	},
});
