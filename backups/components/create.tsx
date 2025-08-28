import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { router } from 'expo-router';

interface ProjectData {
	name: string;
	description: string;
	category: string;
	priority: 'low' | 'medium' | 'high';
}

const categories = [
	'Personnel',
	'Professionnel',
	'Créatif',
	'Éducation',
	'Santé',
	'Autre',
];

const priorities = [
	{ value: 'low', label: 'Faible', color: '#34C759' },
	{ value: 'medium', label: 'Moyenne', color: '#FF9500' },
	{ value: 'high', label: 'Élevée', color: '#FF3B30' },
];

export default function CreateProjectModal() {
	const [isLoading, setIsLoading] = useState(false);
	const [projectData, setProjectData] = useState<ProjectData>({
		name: '',
		description: '',
		category: '',
		priority: 'medium',
	});

	const handleCreate = async () => {
		if (!projectData.name.trim()) {
			Alert.alert('Erreur', 'Le nom du projet est requis');
			return;
		}

		if (!projectData.category) {
			Alert.alert('Erreur', 'Veuillez sélectionner une catégorie');
			return;
		}

		try {
			setIsLoading(true);

			const response = await fetch('/api/projects', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(projectData),
			});

			if (response.ok) {
				Alert.alert(
				'Succès',
				'Projet créé avec succès!',
				[
					{
					text: 'OK',
					onPress: () => router.back(),
					},
				]
				);
			} else {
				throw new Error('Échec de la création du projet');
			}
		} catch (error) {
			Alert.alert('Erreur', 'Impossible de créer le projet. Veuillez réessayer.');
		} finally {
			setIsLoading(false);
		}
	};

	const handleCancel = () => {
		router.back();
	};

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
		>
			<ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
				<View style={styles.form}>
					<View style={styles.inputGroup}>
						<Text style={styles.label}>Nom du projet *</Text>
						<TextInput
							style={styles.input}
							value={projectData.name}
							onChangeText={(text) =>
								setProjectData((prev) => ({ ...prev, name: text }))
							}
							placeholder="Ex: Application mobile, Site web..."
							placeholderTextColor="#8E8E93"
							autoFocus
						/>
					</View>

					<View style={styles.inputGroup}>
						<Text style={styles.label}>Description</Text>
						<TextInput
							style={[styles.input, styles.textArea]}
							value={projectData.description}
							onChangeText={(text) =>
								setProjectData((prev) => ({ ...prev, description: text }))
							}
							placeholder="Décrivez votre projet..."
							placeholderTextColor="#8E8E93"
							multiline
							numberOfLines={4}
							textAlignVertical="top"
						/>
					</View>

					<View style={styles.inputGroup}>
						<Text style={styles.label}>Catégorie *</Text>
						<View style={styles.categoryGrid}>
						{categories.map((category) => (
							<TouchableOpacity
								key={category}
								style={[
									styles.categoryButton,
									projectData.category === category && styles.categoryButtonSelected,
								]}
								onPress={() =>
									setProjectData((prev) => ({ ...prev, category }))
								}
							>
							<Text
								style={[
								styles.categoryText,
								projectData.category === category && styles.categoryTextSelected,
								]}
							>
								{category}
							</Text>
							</TouchableOpacity>
						))}
						</View>
					</View>

					<View style={styles.inputGroup}>
						<Text style={styles.label}>Priorité</Text>
						<View style={styles.priorityContainer}>
						{priorities.map((priority) => (
							<TouchableOpacity
								key={priority.value}
								style={[
									styles.priorityButton,
									projectData.priority === priority.value && {
									backgroundColor: priority.color,
									borderColor: priority.color,
									},
								]}
								onPress={() =>
									setProjectData((prev) => ({
									...prev,
									priority: priority.value as any,
									}))
								}
							>
								<View style={styles.priorityContent}>
									<View
									style={[
										styles.priorityDot,
										{ backgroundColor: priority.color },
										projectData.priority === priority.value && styles.priorityDotSelected,
									]}
									/>
									<Text
										style={[
											styles.priorityText,
											projectData.priority === priority.value && styles.priorityTextSelected,
										]}
									>
										{priority.label}
									</Text>
								</View>
							</TouchableOpacity>
						))}
						</View>
					</View>
					<TouchableOpacity
						onPress={handleCreate}
						style={[styles.createButton, isLoading && styles.createButtonDisabled]}
						disabled={isLoading}
					>
						<Text style={styles.createText}>
							{isLoading ? 'Création...' : 'Créer 🎉'}
						</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F2F2F7',
	},
	content: {
		flex: 1,
	},
	createButton: {
		backgroundColor: '#007AFF',
		paddingVertical: 16,
		borderRadius: 12,
		marginBottom: 12,
		shadowColor: '#007AFF',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 8,
		elevation: 6,
	},
	createButtonDisabled: {
		backgroundColor: '#C6C6C8',
	},
	createText: {
		color: '#FFFFFF',
		fontSize: 18,
		fontWeight: '600',
		textAlign: 'center',
	},
	form: {
		padding: 20,
	},
	inputGroup: {
		marginBottom: 24,
	},
	label: {
		fontSize: 16,
		fontWeight: '600',
		color: '#000000',
		marginBottom: 8,
	},
	input: {
		backgroundColor: '#FFFFFF',
		borderRadius: 12,
		paddingHorizontal: 16,
		paddingVertical: 12,
		fontSize: 16,
		borderWidth: StyleSheet.hairlineWidth,
		borderColor: '#C6C6C8',
	},
	textArea: {
		minHeight: 100,
		paddingTop: 12,
	},
	categoryGrid: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 8,
	},
	categoryButton: {
		backgroundColor: '#FFFFFF',
		borderWidth: 1,
		borderColor: '#C6C6C8',
		borderRadius: 20,
		paddingVertical: 8,
		paddingHorizontal: 16,
		marginBottom: 8,
	},
	categoryButtonSelected: {
		backgroundColor: '#007AFF',
		borderColor: '#007AFF',
	},
	categoryText: {
		fontSize: 14,
		color: '#000000',
	},
	categoryTextSelected: {
		color: '#FFFFFF',
	},
	priorityContainer: {
		gap: 8,
	},
	priorityButton: {
		backgroundColor: '#FFFFFF',
		borderWidth: 1,
		borderColor: '#C6C6C8',
		borderRadius: 12,
		padding: 16,
	},
	priorityContent: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	priorityDot: {
		width: 12,
		height: 12,
		borderRadius: 6,
		marginRight: 12,
	},
	priorityDotSelected: {
		backgroundColor: '#FFFFFF',
	},
	priorityText: {
		fontSize: 16,
		color: '#000000',
	},
	priorityTextSelected: {
		color: '#FFFFFF',
		fontWeight: '600',
	},
});
