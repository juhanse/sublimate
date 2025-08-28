import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Alert } from 'react-native';
import ValideStepButton from '@/components/ui/ValideStepButton';
import { Colors } from '@/constants/Colors';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface Project {
	id: string;
	name: string;
	currentObjective: string;
	color: string;
}

const mockProjects: Project[] = [
	{
		id: '1',
		name: 'Fitness',
		currentObjective: 'Faire 30 pompes d\'affilée',
		color: '#FF6B6B',
	},
	{
		id: '2',
		name: 'Lecture',
		currentObjective: 'Lire 20 pages du livre en cours',
		color: '#4ECDC4',
	},
	{
		id: '3',
		name: 'Méditation',
		currentObjective: 'Méditer 15 minutes',
		color: '#96CEB4',
	},
	{
		id: '4',
		name: 'Guitare',
		currentObjective: 'Pratiquer 30 minutes',
		color: '#FFEAA7',
	},
];

export default function CreateScreen() {
	const [selectedProjectIndex, setSelectedProjectIndex] = useState<number>(0);
	const projects = mockProjects;
	const wheelRadius = 120;
	const bubbleSize = 50;
	const selectedProject = projects[selectedProjectIndex];

  	// Calcul de l'angle pour chaque projet sur un demi-cercle
	const getProjectAngle = (index: number, total: number) => {
		const angleStep = Math.PI / (total + 1);
		return (index + 1) * angleStep;
	};

	// Position des bulles sur la roulette
	const getProjectPosition = (index: number, total: number) => {
		const angle = getProjectAngle(index, total);
		const x = Math.cos(angle) * wheelRadius;
		const y = -Math.sin(angle) * wheelRadius;
		return { x, y };
	};

	const handleTakePhoto = () => {
		if (selectedProject) {
			Alert.alert(
				"Prendre une photo",
				`Valider l'objectif "${selectedProject.currentObjective}" du projet "${selectedProject.name}" ?`,
				[
					{ text: "Annuler", style: "cancel" },
					{
						text: "Valider",
						onPress: () => {
							Alert.alert("Succès", "Objectif validé avec succès !");
						}
					}
				]
			);
		}
	};

	const selectPreviousProject = () => {
		setSelectedProjectIndex(prev => 
			prev === 0 ? projects.length - 1 : prev - 1
		);
	};

	const selectNextProject = () => {
		setSelectedProjectIndex(prev => 
			prev === projects.length - 1 ? 0 : prev + 1
		);
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Text style={styles.title}>Valider une étape</Text>
			</View>

			<View style={styles.mainContent}>
				{projects.length > 0 ? (
					<View style={styles.wheelContainer}>
						<View style={styles.wheel}>
							{projects.map((project, index) => {
							const position = getProjectPosition(index, projects.length);
							const isSelected = index === selectedProjectIndex;
							
							return (
								<TouchableOpacity
									key={project.id}
									style={[
										styles.projectBubble,
										{
										left: screenWidth / 2 + position.x - bubbleSize,
										top: 120 + position.y - bubbleSize / 2,
										backgroundColor: project.color,
										transform: [
											{ scale: isSelected ? 1.3 : 1 }
										],
										elevation: isSelected ? 8 : 3,
										shadowOpacity: isSelected ? 0.4 : 0.25,
										}
									]}
									onPress={() => setSelectedProjectIndex(index)}
								>
									<Text style={styles.bubbleText}>
										{project.name.charAt(0).toUpperCase()}
									</Text>
									{isSelected && (
										<View style={styles.selectedIndicator} />
									)}
								</TouchableOpacity>
							);
							})}
						</View>

						<View style={styles.navigationButtons}>
							<TouchableOpacity style={styles.navButton} onPress={selectNextProject}>
								<Text style={styles.navButtonText}>←</Text>
							</TouchableOpacity>
							<TouchableOpacity style={styles.navButton} onPress={selectPreviousProject}>
								<Text style={styles.navButtonText}>→</Text>
							</TouchableOpacity>
						</View>
					</View>
				) : null}
			</View>

			{selectedProject ? (
				<ValideStepButton text={selectedProject.currentObjective} onPress={handleTakePhoto} />
			) : null}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
		padding: 20,
		borderRadius: 46,
	},
	header: {
		alignItems: 'center',
		marginTop: 20,
		marginBottom: 30,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#333',
	},
	mainContent: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	wheelContainer: {
		width: 300,
		height: 280,
		position: 'relative',
		marginBottom: 40,
	},
	wheel: {
		width: '100%',
		height: '100%',
		position: 'relative',
	},
	projectBubble: {
		position: 'absolute',
		width: 50,
		height: 50,
		borderRadius: 25,
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 4,
		borderWidth: 2,
		borderColor: 'rgba(255, 255, 255, 0.3)',
	},
	bubbleText: {
		color: 'white',
		fontSize: 18,
		fontWeight: 'bold',
	},
	selectedIndicator: {
		position: 'absolute',
		width: 60,
		height: 60,
		borderRadius: 30,
		borderWidth: 3,
		borderColor: Colors.purple,
		backgroundColor: 'transparent',
	},
	navigationButtons: {
		position: 'absolute',
		bottom: 20,
		left: 0,
		right: 0,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 40,
	},
	navButton: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: Colors.purple,
		justifyContent: 'center',
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	navButtonText: {
		color: 'white',
		fontSize: 20,
		fontWeight: 'bold',
	},
});
