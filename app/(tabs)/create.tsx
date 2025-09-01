import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createProject } from '@/services/projectsQueries';
import { fetchCategories } from '@/services/categoriesQueries';
import { CreateProject } from '@/services/projectsQueries';

export default function CreateProjectModal() {
	const [projectData, setProjectData] = useState<CreateProject>({
		name: '',
		thumbnail: '',
		categories: [],
		steps: [],
	});

	const categoriesQuery = useQuery({
		queryKey: ['categories', 'fr'],
		queryFn: () => fetchCategories('fr'),
	});

	const { mutate, isPending } = useMutation({
		mutationFn: (projectData: CreateProject) => createProject(projectData),
		onSuccess: async (data) => {
			Alert.alert('Succès', 'Le projet a été créé avec succès');
			console.log('Projet créé:', data);
		},
		onError: (error) => {
			console.log(error);
			alert('Echec de la création du projet');
		},
	});

	const handleCreate = async () => {
		if (!projectData.name.trim()) {
			Alert.alert('Erreur', 'Le nom du projet est requis');
			return;
		}

		if (projectData.categories.length === 0) {
			Alert.alert('Erreur', 'Veuillez sélectionner une catégorie');
			return;
		}

		if (projectData.steps.length === 0) {
			Alert.alert('Erreur', 'Veuillez ajouter au moins une étape');
			return;
		}

		mutate(projectData);
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
						<Text style={styles.label}>Catégorie *</Text>
						<View style={styles.categoryGrid}>
						{projectData.categories.map((category) => (
							<TouchableOpacity
								key={category}
								style={[
									styles.categoryButton,
									projectData.categories.includes(category) && styles.categoryButtonSelected,
								]}
								onPress={() =>
									setProjectData((prev) => {
										const newCategories = prev.categories.includes(category)
											? prev.categories.filter((c) => c !== category)
											: [...prev.categories, category];
										return { ...prev, categories: newCategories };
									})
								}
							>
							<Text
								style={[
								styles.categoryText,
								projectData.categories.includes(category) && styles.categoryTextSelected,
								]}
							>
								{category}
							</Text>
							</TouchableOpacity>
						))}
						</View>
					</View>

					<TouchableOpacity
						onPress={handleCreate}
						style={[styles.createButton, isPending && styles.createButtonDisabled]}
						disabled={isPending}
					>
						<Text style={styles.createText}>
							{isPending ? 'Création...' : 'Créer 🎉'}
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
