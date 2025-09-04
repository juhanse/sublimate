import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Project } from '@/services/projectsQueries';
import { Colors } from '@/constants/Colors';

type ProjectCardProps = {
	data: Project;
	onPress?: () => void;
	onValidate?: () => void;
};

export default function ProjectCard({ data, onPress, onValidate }: ProjectCardProps) {
	const handleValidateProject = async () => {
		if (onValidate) onValidate();
	};

	return (
		<TouchableOpacity style={styles.shadowWrap} onLongPress={onPress} delayLongPress={70}>
			<ImageBackground
				source={{ uri: data.thumbnail }}
				style={styles.container}
				imageStyle={styles.imageBg}
				resizeMode="cover"
			>
				<LinearGradient
					colors={["#0008", "#0003", "#0000"]}
					style={StyleSheet.absoluteFill}
					start={{ x: 0, y: 1 }}
					end={{ x: 1, y: 0 }}
				/>
				<View style={styles.content}>
					<Text style={styles.projectName} numberOfLines={3}>{data.name}</Text>

					<View style={styles.categoryContainer}>
						{Array.isArray(data.projects_categories) &&
							data.projects_categories.map((item) => (
							<View key={item.categories.id} style={styles.categoryBadge}>
								<Text style={styles.categoryText}>{item.categories.name}</Text>
							</View>
						))}
					</View>
				</View>
				<TouchableOpacity style={styles.button} onPress={handleValidateProject}>
					<Text style={styles.text}>Sparkle</Text>
				</TouchableOpacity>
			</ImageBackground>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	shadowWrap: {
		width: 280,
		height: 400,
		borderRadius: 40,
		marginRight: 20,
		shadowColor: '#000000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.1,
		shadowRadius: 12,
		elevation: 6,
		overflow: 'hidden',
	},
	container: {
		width: '100%',
		height: '100%',
		borderRadius: 4,
		overflow: 'hidden',
		justifyContent: 'flex-end',
		backgroundColor: '#222',
	},
	imageBg: {
		borderRadius: 40,
	},
	content: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'flex-start',
		padding: 28,
		paddingBottom: 0,
	},
	projectName: {
		color: 'white',
		fontFamily: 'Borna',
		fontSize: 24,
		fontWeight: 'bold',
		textAlign: 'left',
		marginBottom: 8,
		maxWidth: '80%',
	},
	button: {
		backgroundColor: Colors.purple,
		borderRadius: 30,
		marginHorizontal: 24,
		marginBottom: 24,
		paddingVertical: 16,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 4,
		shadowOpacity: 0.3,
		elevation: 2,
	},
	text: {
		color: 'white',
		fontFamily: 'Borna',
		fontSize: 16,
		textAlign: 'center',
		fontWeight: 'bold',
		letterSpacing: 0.5,
	},
	categoryContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 6,
	},
	categoryBadge: {
		backgroundColor: "rgba(124, 95, 255, 0.2)",
		borderRadius: 12,
		paddingVertical: 4,
		paddingHorizontal: 8,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 2,
	},
	categoryText: {
		color: 'white',
		fontFamily: 'Mona',
		fontSize: 12,
		fontWeight: 'bold',
	},
});
