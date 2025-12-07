import React, { useEffect, useState } from 'react';
import { View, TextInput, ActivityIndicator, Pressable, Alert, StyleSheet } from 'react-native';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import { fetchMeProjectById, updateMeProjectById, UpdateProject } from '@/services/projectsQueries';
import { router, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { PosX } from '@/constants/Responsive';
import { Background } from '@/components/ui/Background';
import Button from '@/components/ui/Button';
import { Entypo } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import Categories from '@/components/project/Categories';
import StepsFlow from '@/components/project/StepsFlow';

export default function ProjectScreen() {
	const { id } = useLocalSearchParams();
	const projectId = id as string;
	const { t } = useTranslation();
	const queryClient = useQueryClient();
	const [title, setTitle] = useState('');
	const [selectedCatIds, setSelectedCatIds] = useState<string[]>([]);

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

	const handleDelete = async () => {
		await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
		Alert.alert(
			t('delete_project'),
			t('delete_project_confirmation'),
			[
				{
					text: t('cancel'),
					style: 'cancel',
				},
				{
					text: t('delete'),
					style: 'destructive',
					onPress: () => {},
				},
			],
			{ cancelable: true }
		);
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

			<Categories projectId={projectId} maxCategories={2} />

			<View style={styles.stepsContainer}>
				<StepsFlow steps={projectQuery.data?.steps || []} />
			</View>

			<View style={styles.buttonContainer}>
				<Button type='warning' onPress={handleDelete}>
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
	stepsContainer: {
		flex: 1,
		width: '100%',
		marginBottom: PosX(140),
	},
});
