import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Colors } from '@/constants/Colors';

export default function ProjectCard() {
	const handleValidateProject = async () => {
		// TODO
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity style={styles.button} onPress={handleValidateProject}>
				<Text style={styles.text}>Valider</Text>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		borderRadius: 60,
		marginRight: 20,
		shadowColor: '#000000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.1,
		shadowRadius: 12,
		elevation: 6,
		backgroundColor: 'red',
	},
	button: {
		backgroundColor: Colors.purple,
		borderRadius: 30,
		padding: 60,
		marginHorizontal: 24,
		paddingVertical: 20,
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
	},
});
