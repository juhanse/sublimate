import React, { useEffect, useState } from 'react';
import { View, TextInput, ActivityIndicator, Pressable, StyleSheet, ScrollView } from 'react-native';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { fetchMeProjectById, updateMeProjectById, UpdateProject } from '@/services/projectsQueries';
import { router, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { PosX } from '@/constants/Responsive';
import { Background } from '@/components/ui/Background';
import Button from '@/components/ui/Button';
import CategorySelector from '@/components/project/CategorySelector';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Entypo } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

export default function ProjectScreen() {
	const [title, setTitle] = useState('');
	const { t } = useTranslation();
	const queryClient = useQueryClient();
	const { id } = useLocalSearchParams();
	const projectId = id as string;

	const projectQuery = useQuery({
		queryKey: ['projectId', projectId],
		queryFn: () => fetchMeProjectById(projectId),
	});

	const { mutate, isPending } = useMutation({
        mutationFn: (project: UpdateProject) => updateMeProjectById(projectId, project),
        onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['projects', 'active'] });
			queryClient.invalidateQueries({ queryKey: ['projectId', projectId] });
			router.back();
        },
        onError: (error) => {
            console.error(error);
        },
    });

	useEffect(() => {
		if (projectQuery.data?.name) {
			setTitle(projectQuery.data.name);
		}
	}, [projectQuery.data?.name]);

	const handleBack = async () => {
		await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
		router.back();
	};

	const handleSave = async () => {
		await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
		mutate({ name: title });
	}

	if (projectQuery.isLoading) {
		return <ActivityIndicator color="white" size="small" />;
	}

	return (
		<View style={styles.container}>
			<Background url={projectQuery.data?.thumbnail}/>

			<Pressable style={styles.back} onPress={handleBack}>
				<Entypo name="chevron-left" size={PosX(30)} color="#D9D9D9" />
			</Pressable>

			<TextInput
				style={styles.title}
				value={title}
				onChangeText={setTitle}
				maxLength={50}
			/>

			<CategorySelector categories={projectQuery.data?.projects_categories} />

			<ScrollView style={styles.scrollContainer}>
				<View style={styles.steps}>
					<View style={styles.step}>
						<Entypo name="menu" size={PosX(30)} color="#888888"/>
						<TextInput
							style={styles.stepName}
							placeholder='Step Name'
							placeholderTextColor="rgba(227, 223, 217, 0.8)"
						/>
						<DateTimePicker
							testID="dateTimePicker"
							value={new Date()}
							mode={'date'}
							is24Hour={true}
						/>
					</View>
					<View style={styles.step}>
						<Entypo name="menu" size={PosX(30)} color="#888888"/>
						<TextInput
							style={styles.stepName}
							placeholder='Step Name'
							placeholderTextColor="rgba(227, 223, 217, 0.8)"
						/>
						<DateTimePicker
							testID="dateTimePicker"
							value={new Date()}
							mode={'date'}
							is24Hour={true}
						/>
					</View>
					<View style={styles.step}>
						<Entypo name="menu" size={PosX(30)} color="#888888"/>
						<TextInput
							style={styles.stepName}
							placeholder='Step Name'
							placeholderTextColor="rgba(227, 223, 217, 0.8)"
						/>
						<DateTimePicker
							testID="dateTimePicker"
							value={new Date()}
							mode={'date'}
							is24Hour={true}
						/>
					</View>
					<View style={styles.step}>
						<Entypo name="menu" size={PosX(30)} color="#888888"/>
						<TextInput
							style={styles.stepName}
							placeholder='Step Name'
							placeholderTextColor="rgba(227, 223, 217, 0.8)"
						/>
						<DateTimePicker
							testID="dateTimePicker"
							value={new Date()}
							mode={'date'}
							is24Hour={true}
						/>
					</View>
					<View style={styles.step}>
						<Entypo name="menu" size={PosX(30)} color="#888888"/>
						<TextInput
							style={styles.stepName}
							placeholder='Step Name'
							placeholderTextColor="rgba(227, 223, 217, 0.8)"
						/>
						<DateTimePicker
							testID="dateTimePicker"
							value={new Date()}
							mode={'date'}
							is24Hour={true}
						/>
					</View>
					<View style={styles.step}>
						<Entypo name="menu" size={PosX(30)} color="#888888"/>
						<TextInput
							style={styles.stepName}
							placeholder='Step Name'
							placeholderTextColor="rgba(227, 223, 217, 0.8)"
						/>
						<DateTimePicker
							testID="dateTimePicker"
							value={new Date()}
							mode={'date'}
							is24Hour={true}
						/>
					</View>
					<View style={styles.step}>
						<Entypo name="menu" size={PosX(30)} color="#888888"/>
						<TextInput
							style={styles.stepName}
							placeholder='Step Name'
							placeholderTextColor="rgba(227, 223, 217, 0.8)"
						/>
						<DateTimePicker
							testID="dateTimePicker"
							value={new Date()}
							mode={'date'}
							is24Hour={true}
						/>
					</View>
					<View style={styles.step}>
						<Entypo name="menu" size={PosX(30)} color="#888888"/>
						<TextInput
							style={styles.stepName}
							placeholder='Step Name'
							placeholderTextColor="rgba(227, 223, 217, 0.8)"
						/>
						<DateTimePicker
							testID="dateTimePicker"
							value={new Date()}
							mode={'date'}
							is24Hour={true}
						/>
					</View>
					<View style={styles.step}>
						<Entypo name="menu" size={PosX(30)} color="#888888"/>
						<TextInput
							style={styles.stepName}
							placeholder='Step Name'
							placeholderTextColor="rgba(227, 223, 217, 0.8)"
						/>
						<DateTimePicker
							testID="dateTimePicker"
							value={new Date()}
							mode={'date'}
							is24Hour={true}
						/>
					</View>
					<View style={styles.step}>
						<Entypo name="menu" size={PosX(30)} color="#888888"/>
						<TextInput
							style={styles.stepName}
							placeholder='Step Name'
							placeholderTextColor="rgba(227, 223, 217, 0.8)"
						/>
						<DateTimePicker
							testID="dateTimePicker"
							value={new Date()}
							mode={'date'}
							is24Hour={true}
						/>
					</View>
				</View>
			</ScrollView>

			<View style={styles.buttonContainer}>
				<Button type='warning' onPress={() => {}}>
					{t('delete')}
				</Button>
				<Button type='primary' onPress={handleSave} pending={isPending}>
					{t('save')}
				</Button>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
		paddingHorizontal: PosX(20),
		paddingVertical: PosX(40),
		gap: PosX(20),
	},
	back: {
		position: 'absolute',
		top: PosX(70),
		left: PosX(50),
		zIndex: 10,
	},
	title: {
		marginTop: PosX(80),
		fontSize: PosX(32),
		fontFamily: 'Borna',
		color: '#FFFFFF',
		textAlign: 'center',
	},
	buttonContainer: {
		position: 'absolute',
		width: '100%',
		bottom: PosX(50),
		gap: PosX(15),
	},
	scrollContainer: {
		flex: 1,
		width: '100%',
		marginBottom: PosX(150),
	},
	steps: {
		gap: PosX(10),
	},
	step: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: PosX(10),
		paddingHorizontal: PosX(20),
		width: '100%',
		height: PosX(60),
		gap: PosX(10),
		borderRadius: PosX(16),
		borderWidth: 1,
		borderColor: '#393939',
		backgroundColor: "#302C26"
	},
	stepName: {
		flex: 1,
		fontFamily: "SF-Medium",
		fontSize: PosX(18),
		color: "rgba(227, 223, 217, 0.8)"
	},
});
