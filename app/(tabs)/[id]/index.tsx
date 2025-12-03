import React, { useEffect, useState } from 'react';
import { View, TextInput, ActivityIndicator, Pressable, StyleSheet } from 'react-native';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { fetchMeProjectById, updateMeProjectById, UpdateProject } from '@/services/projectsQueries';
import { router, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { PosX } from '@/constants/Responsive';
import { Entypo } from '@expo/vector-icons';
import { Background } from '@/components/ui/Background';
import Button from '@/components/ui/Button';
import CategorySelector from '@/components/project/CategorySelector';
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
		paddingHorizontal: PosX(20),
	},
	back: {
		position: 'absolute',
		top: PosX(70),
		left: PosX(50),
		zIndex: 10,
	},
	title: {
		marginTop: PosX(150),
		marginBottom: PosX(30),
		fontSize: PosX(32),
		fontFamily: 'Borna', 
		fontWeight: '600',
		color: '#FFFFFF',
		textAlign: 'center',
	},
	buttonContainer: {
		position: 'absolute',
		bottom: PosX(50),
		width: '100%',
		gap: PosX(15),
	},
});
