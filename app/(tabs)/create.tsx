import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProject } from '@/services/projectsQueries';
import { CreateProject } from '@/services/projectsQueries';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import CategorySelector from '@/components/create/CategorySelector';
import * as Haptics from 'expo-haptics';

export default function CreateProjectModal() {
	const queryClient = useQueryClient();

	const [projectData, setProjectData] = useState<CreateProject>({
		name: "",
		thumbnail: "",
		categories: [],
		steps: [],
	});

	const { mutate, isPending } = useMutation({
		mutationFn: (projectData: CreateProject) => createProject(projectData),
		onSuccess: async (data) => {
			queryClient.invalidateQueries({ queryKey: ['projects', 'active'] });
			console.log('Projet créé:', data);
			router.back();
		},
		onError: (error) => {
			Alert.alert('Echec de la création du projet');
			console.log(error);
			router.back();
		},
	});

	const handleAddStep = async () => {
		await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
		setProjectData((prev) => ({
			...prev,
			steps: [
				...prev.steps,
				{
					id: "",
					project_id: "",
					index: prev.steps.length,
					name: "",
					deadline: "",
					is_completed: false,
					created_at: "",
					updated_at: "",
				},
			],
		}));
	};

	const handleUpdateStep = (index: number, key: "name" | "deadline", value: string) => {
		setProjectData((prev) => {
			const newSteps = [...prev.steps];
			newSteps[index][key] = value;
			return { ...prev, steps: newSteps };
		});
	};

	const handleRemoveStep = async (index: number) => {
		await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
		setProjectData((prev) => {
			const newSteps = prev.steps.filter((_, i) => i !== index);
			return { ...prev, steps: newSteps };
		});
	};

	const handleCreate = async () => {
		await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

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

		const stepsSorted = [...projectData.steps].sort(
			(a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
		);

		mutate({ ...projectData, steps: stepsSorted });
	};

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
		>
			<ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
					<View style={styles.categoryContainer}>
						<Text style={styles.label}>Catégories :</Text>

						<CategorySelector
							value={projectData.categories}
							onChange={(selected) => setProjectData((prev) => ({ ...prev, categories: selected }))}
						/>
					</View>

					<View style={styles.nameContainer}>
						<Text style={styles.label}>Nom du projet :</Text>
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
				
					<View style={styles.stepsContainer}>
        				<Text style={styles.label}>
							Étapes du projet :
						</Text>
						{projectData.steps.map((step, index) => (
						<View
							key={index}
							style={{
								marginBottom: 12,
								padding: 8,
								borderWidth: 1,
								borderColor: "#ccc",
								borderRadius: 8,
							}}
						>
							<TextInput
								style={{
									borderBottomWidth: 1,
									borderColor: "#ddd",
									marginBottom: 8,
									padding: 4,
								}}
								placeholder="Nom de l'étape"
								value={step.name}
								onChangeText={(text) => handleUpdateStep(index, "name", text)}
							/>
							<TextInput
								style={{
									borderBottomWidth: 1,
									borderColor: "#ddd",
									marginBottom: 8,
									padding: 4,
								}}
								placeholder="Deadline (YYYY-MM-DD)"
								value={step.deadline}
								onChangeText={(text) => handleUpdateStep(index, "deadline", text)}
							/>
							<TouchableOpacity
								onPress={() => handleRemoveStep(index)}
								style={{ alignSelf: "flex-end" }}
							>
								<Text style={{ color: "red" }}>Supprimer</Text>
							</TouchableOpacity>
						</View>
						))}

						<TouchableOpacity
							onPress={handleAddStep}
							style={{
								backgroundColor: Colors.purple,
								padding: 12,
								borderRadius: 8,
								alignItems: "center",
								marginBottom: 16,
							}}
						>
							<Text style={{ color: "white" }}>+ Ajouter une étape</Text>
						</TouchableOpacity>

						<TouchableOpacity
							onPress={handleCreate}
							style={[styles.createButton, isPending && styles.createButtonDisabled]}
							disabled={isPending}
						>
							<Text style={styles.createText}>
								{isPending ? 'Création...' : 'Créer le projet'}
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
		borderRadius: 60,
		backgroundColor: '#F2F2F7',
	},
	content: {
		flex: 1,
	},
	categoryContainer: {
		marginTop: 40,
		paddingHorizontal: 24,
	},
	nameContainer: {
		marginTop: 24,
		paddingHorizontal: 24,
	},
	stepsContainer: {
		marginTop: 24,
		paddingHorizontal: 24,
	},
	createButton: {
		backgroundColor: Colors.purple,
		borderRadius: 30,
		marginBottom: 24,
		paddingVertical: 16,
		shadowColor: Colors.purple,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 4,
		shadowOpacity: 0.3,
		elevation: 2,
	},
	createButtonDisabled: {
		backgroundColor: '#C6C6C8',
	},
	createText: {
		color: '#FFFFFF',
		fontSize: 20,
		fontFamily: 'Mona',
		textAlign: 'center',
	},
	form: {
		padding: 20,
	},
	inputGroup: {
		marginBottom: 24,
	},
	label: {
		fontSize: 18,
		fontFamily: 'Mona',
		color: '#1b1b1bff',
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
		backgroundColor: Colors.purple,
		borderColor: Colors.purple,
	},
	categoryText: {
		fontSize: 14,
		color: '#000000',
	},
	categoryTextSelected: {
		color: '#FFFFFF',
	},
});
