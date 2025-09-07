import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet, ScrollView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProject } from '@/services/projectsQueries';
import { CreateProject } from '@/services/projectsQueries';
import { router } from 'expo-router';
import { Colors } from '@/constants/Colors';
import CategorySelector from '@/components/create/CategorySelector';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';

export default function CreateProjectModal() {
	const queryClient = useQueryClient();

	const [open, setOpen] = useState(false);
	const [date, setDate] = useState(new Date());
	const [selectedStepIndex, setSelectedStepIndex] = useState<number | null>(null);
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

	const handleOpenDatePicker = (stepIndex: number) => {
		setSelectedStepIndex(stepIndex);
		const existingDeadline = projectData.steps[stepIndex].deadline;
		if (existingDeadline) {
			setDate(new Date(existingDeadline));
		} else {
			setDate(new Date());
		}
		setOpen(true);
	};

	const handleDateChange = (event: any, selectedDate?: Date) => {
		if (Platform.OS === 'android') {
			setOpen(false);
		}
		
		if (selectedDate && selectedStepIndex !== null) {
			setDate(selectedDate);
			handleUpdateStep(selectedStepIndex, "deadline", selectedDate.toISOString().split("T")[0]);
			if (Platform.OS === 'ios') {
				setOpen(false);
				setSelectedStepIndex(null);
			}
		}
	};

	return (
		<KeyboardAvoidingView
			style={styles.container}
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
		>
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
					style={styles.nameText}
					value={projectData.name}
					onChangeText={(text) =>
						setProjectData((prev) => ({ ...prev, name: text }))
					}
					placeholder="Ex: Application mobile, Site web..."
					placeholderTextColor="#8E8E93"
					autoFocus
				/>
			</View>

			<ScrollView style={styles.stepsContainer} showsVerticalScrollIndicator={false}>
				<Text style={styles.label}>
					Étapes du projet :
				</Text>

				{projectData.steps
					.map((step, index) => ({ ...step, originalIndex: index }))
					.sort((a, b) => {
						if (!a.deadline && !b.deadline) return 0;
						if (!a.deadline) return 1;
						if (!b.deadline) return -1;
						return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
					})
					.map((step) => (
					<View key={step.originalIndex} style={styles.stepBox}>
						<View style={styles.stepContent}>
							<View style={styles.stepLeft}>
								<TextInput
									style={styles.stepName}
									placeholder="Nom de l'étape"
									value={step.name}
									onChangeText={(text) => handleUpdateStep(step.originalIndex, "name", text)}
								/>
								<TouchableOpacity 
									style={styles.deadlineSelector}
									onPress={() => handleOpenDatePicker(step.originalIndex)}
								>
									<Text style={styles.deadlineText}>
										{step.deadline 
											? `Deadline : ${new Date(step.deadline).toLocaleDateString('fr-FR')}`
											: 'Choisir une deadline'
										}
									</Text>
								</TouchableOpacity>
							</View>
							
							<TouchableOpacity
								onPress={() => handleRemoveStep(step.originalIndex)}
								style={styles.deleteButton}
							>
								<Ionicons name="trash" style={styles.deleteIcon} />
							</TouchableOpacity>
						</View>
					</View>
				))}

				{open && (
					<>
						{Platform.OS === 'ios' ? (
							<Modal
								transparent={true}
								animationType="slide"
								visible={open}
								onRequestClose={() => {
									setOpen(false);
									setSelectedStepIndex(null);
								}}
							>
								<View style={styles.modalContainer}>
									<View style={styles.modalContent}>
										<View style={styles.modalHeader}>
											<TouchableOpacity
												onPress={() => {
													setOpen(false);
													setSelectedStepIndex(null);
												}}
												style={styles.modalButton}
											>
												<Text style={styles.modalButtonText}>Annuler</Text>
											</TouchableOpacity>
											<TouchableOpacity
												onPress={() => {
													if (selectedStepIndex !== null) {
														handleUpdateStep(selectedStepIndex, "deadline", date.toISOString().split("T")[0]);
													}
													setOpen(false);
													setSelectedStepIndex(null);
												}}
												style={styles.modalButton}
											>
												<Text style={[styles.modalButtonText, { color: Colors.purple }]}>Confirmer</Text>
											</TouchableOpacity>
										</View>
										<DateTimePicker
											value={date}
											mode="date"
											display="spinner"
											onChange={handleDateChange}
											style={styles.datePicker}
										/>
									</View>
								</View>
							</Modal>
						) : (
							<DateTimePicker
								value={date}
								mode="date"
								display="default"
								onChange={handleDateChange}
							/>
						)}
					</>
				)}

				<TouchableOpacity
					onPress={handleAddStep}
					style={styles.addStepButton}
				>
					<Text style={styles.addStepText}>Ajouter une étape</Text>
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
			</ScrollView>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		borderRadius: 60,
		backgroundColor: Colors.background,
	},
	label: {
		fontSize: 18,
		fontFamily: 'Borna',
		color: 'white',
		marginBottom: 8,
	},
	categoryContainer: {
		marginTop: 40,
		paddingHorizontal: 24,
	},
	nameContainer: {
		marginTop: 24,
		paddingHorizontal: 24,
	},
	nameText: {
		fontSize: 16,
		fontFamily: 'Mona',
		color: 'white',
		paddingVertical: 12,
		backgroundColor: '#1C1C1E',
		borderRadius: 8,
		paddingHorizontal: 12,
		borderWidth: 2,
		borderColor: '#3A3A3C',
	},
	stepsContainer: {
		marginTop: 24,
		paddingHorizontal: 24,
	},
	stepBox: {
		backgroundColor: '#1C1C1E',
		padding: 16,
		borderRadius: 8,
		marginBottom: 16,
		borderWidth: 2,
		borderColor: '#3A3A3C',
	},
	stepContent: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	stepLeft: {
		flex: 1,
		marginRight: 12,
	},
	stepName: {
		fontSize: 18,
		fontFamily: 'Borna',
		color: 'white',
		marginBottom: 8,
		backgroundColor: 'transparent',
		padding: 0,
	},
	deadlineSelector: {
		paddingVertical: 8,
		paddingHorizontal: 12,
		backgroundColor: '#2C2C2E',
		borderRadius: 6,
		borderWidth: 1,
		borderColor: '#3A3A3C',
	},
	deadlineText: {
		fontSize: 14,
		fontFamily: 'Mona',
		color: '#8E8E93',
	},
	deleteButton: {
		alignItems: 'center',
		justifyContent: 'center',
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: '#FF3B30',
	},
	deleteIcon: {
		fontSize: 18,
		color: 'white',
	},
	addStepButton: {
		padding: 12,
		borderRadius: 8,
		alignItems: 'center',
		marginBottom: 16,
	},
	addStepText: {
		color: Colors.purple,
		fontSize: 16,
		fontFamily: 'Mona',
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
	modalContainer: {
		flex: 1,
		justifyContent: 'flex-end',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	modalContent: {
		backgroundColor: Colors.background,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		paddingBottom: 34,
	},
	modalHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingHorizontal: 20,
		paddingVertical: 16,
		borderBottomWidth: 1,
		borderBottomColor: '#3A3A3C',
	},
	modalButton: {
		paddingVertical: 8,
		paddingHorizontal: 16,
	},
	modalButtonText: {
		fontSize: 17,
		fontFamily: 'Mona',
		color: 'white',
	},
	datePicker: {
		backgroundColor: Colors.background,
	},
});
