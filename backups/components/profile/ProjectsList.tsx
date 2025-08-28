import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Project } from '../../app/(tabs)/profile';

interface ProjectsListProps {
	projects: Project[];
	onProjectDownload: (project: Project) => void;
}

interface ProjectItemProps {
	project: Project;
	onDownload: () => void;
}

const CATEGORY_ICONS = {
	'Développement': 'code-slash',
	'Design': 'color-palette',
	'Backend': 'server',
	'Mobile': 'phone-portrait',
	'Web': 'globe',
	'Data': 'analytics',
	'Autre': 'folder',
};

const CATEGORY_COLORS = {
	'Développement': '#007AFF',
	'Design': '#AF52DE',
	'Backend': '#34C759',
	'Mobile': '#FF9500',
	'Web': '#FF3B30',
	'Data': '#5856D6',
	'Autre': '#8E8E93',
};

function ProjectItem({ project, onDownload }: ProjectItemProps) {
	const categoryIcon = CATEGORY_ICONS[project.category as keyof typeof CATEGORY_ICONS] || 'folder';
	const categoryColor = CATEGORY_COLORS[project.category as keyof typeof CATEGORY_COLORS] || '#8E8E93';
	
	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('fr-FR', {
			day: 'numeric',
			month: 'short',
			year: 'numeric',
		});
	};

	return (
		<View style={styles.projectItem}>
			<View style={styles.projectContent}>
				<View style={[styles.categoryIcon, { backgroundColor: categoryColor + '20' }]}>
					<Ionicons 
						name={categoryIcon as any} 
						size={20} 
						color={categoryColor} 
					/>
				</View>

				<View style={styles.projectInfo}>
					<Text style={styles.projectTitle} numberOfLines={1}>
						{project.title}
					</Text>
					<View style={styles.projectMeta}>
						<Text style={styles.categoryText}>{project.category}</Text>
						<View style={styles.separator} />
						<Text style={styles.dateText}>
							{formatDate(project.completedDate)}
						</Text>
					</View>
				</View>

				<TouchableOpacity
					style={styles.downloadButton}
					onPress={onDownload}
					activeOpacity={0.7}
				>
					<Ionicons name="download" size={18} color="#007AFF" />
				</TouchableOpacity>
			</View>

			<View style={styles.statusBadge}>
				<View style={styles.statusDot} />
				<Text style={styles.statusText}>Terminé</Text>
			</View>
		</View>
	);
}

export default function ProjectsList({ projects, onProjectDownload }: ProjectsListProps) {
	const renderProject = ({ item }: { item: Project }) => (
		<ProjectItem
			project={item}
			onDownload={() => onProjectDownload(item)}
		/>
	);

	const renderEmptyState = () => (
		<View style={styles.emptyState}>
			<Ionicons name="folder-open" size={48} color="#C7C7CC" />
			<Text style={styles.emptyTitle}>Aucun projet terminé</Text>
			<Text style={styles.emptySubtitle}>
				Vos projets complétés apparaîtront ici
			</Text>
		</View>
	);

	return (
		<View style={styles.container}>
			<View style={styles.sectionHeader}>
				<Text style={styles.sectionTitle}>Projets terminés</Text>
				<View style={styles.projectCounter}>
					<Text style={styles.counterText}>{projects.length}</Text>
				</View>
			</View>

			{projects.length > 0 ? (
				<FlatList
					data={projects}
					renderItem={renderProject}
					keyExtractor={(item) => item.id}
					style={styles.list}
					scrollEnabled={false}
					ItemSeparatorComponent={() => <View style={styles.separator} />}
				/>
			) : (
				renderEmptyState()
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 16,
		marginTop: 24,
	},
	sectionHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 16,
	},
	sectionTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#1D1D1F',
	},
	projectCounter: {
		backgroundColor: '#F2F2F7',
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 12,
	},
	counterText: {
		fontSize: 14,
		fontWeight: '600',
		color: '#8E8E93',
	},
	list: {
		backgroundColor: '#FFFFFF',
		borderRadius: 16,
		shadowColor: '#000000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 4,
	},
	projectItem: {
		padding: 16,
	},
	projectContent: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 8,
	},
	categoryIcon: {
		width: 40,
		height: 40,
		borderRadius: 12,
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 12,
	},
	projectInfo: {
		flex: 1,
	},
	projectTitle: {
		fontSize: 16,
		fontWeight: '600',
		color: '#1D1D1F',
		marginBottom: 4,
	},
	projectMeta: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	categoryText: {
		fontSize: 12,
		color: '#8E8E93',
		fontWeight: '500',
	},
	separator: {
		width: 1,
		height: 12,
		backgroundColor: '#E5E5EA',
		marginHorizontal: 8,
	},
	dateText: {
		fontSize: 12,
		color: '#8E8E93',
	},
	downloadButton: {
		width: 36,
		height: 36,
		borderRadius: 18,
		backgroundColor: '#F2F2F7',
		justifyContent: 'center',
		alignItems: 'center',
	},
	statusBadge: {
		flexDirection: 'row',
		alignItems: 'center',
		marginLeft: 52, // Aligné avec le titre
	},
	statusDot: {
		width: 6,
		height: 6,
		borderRadius: 3,
		backgroundColor: '#34C759',
		marginRight: 6,
	},
	statusText: {
		fontSize: 12,
		color: '#34C759',
		fontWeight: '500',
	},
	emptyState: {
		backgroundColor: '#FFFFFF',
		borderRadius: 16,
		padding: 32,
		alignItems: 'center',
		shadowColor: '#000000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 4,
	},
	emptyTitle: {
		fontSize: 18,
		fontWeight: '600',
		color: '#8E8E93',
		marginTop: 16,
		marginBottom: 8,
	},
	emptySubtitle: {
		fontSize: 14,
		color: '#C7C7CC',
		textAlign: 'center',
	},
});
