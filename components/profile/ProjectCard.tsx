import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';

type ProjectCardProps = {
	name: string;
	thumbnail: string;
	onValidate?: () => void;
};

export default function ProjectCard({ name, thumbnail, onValidate }: ProjectCardProps) {
	const handleValidateProject = async () => {
		if (onValidate) onValidate();
	};

	return (
		<View style={styles.shadowWrap}>
			<ImageBackground
				source={{ uri: thumbnail }}
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
					<Text style={styles.projectName} numberOfLines={3}>{name}</Text>
				</View>
				<TouchableOpacity style={styles.button} onPress={handleValidateProject}>
					<Text style={styles.text}>Valider</Text>
				</TouchableOpacity>
			</ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({
	shadowWrap: {
		width: 280,
		height: 360,
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
		fontSize: 28,
		fontWeight: 'bold',
		textAlign: 'left',
		marginBottom: 8,
		textShadowColor: '#0008',
		textShadowOffset: { width: 0, height: 2 },
		textShadowRadius: 8,
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
});
