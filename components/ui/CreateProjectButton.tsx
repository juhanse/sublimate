import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '@/constants/Colors';

type CreateProjectButtonProps = {
	onPress: () => void;
};

const CreateProjectButton: React.FC<CreateProjectButtonProps> = ({ onPress }) => {
	return (
		<TouchableOpacity style={styles.button} onPress={onPress}>
			<Text style={styles.text}>Nouveau projet</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		backgroundColor: Colors.purple,
		borderRadius: 32,
		padding: 20,
		marginBottom: 80,
		marginHorizontal: 20,
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

export default CreateProjectButton;
