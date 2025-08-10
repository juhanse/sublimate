import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

type ValideStepButtonProps = {
	text: string;
	onPress: () => void;
};

const ValideStepButton: React.FC<ValideStepButtonProps> = ({ text, onPress }) => {
	return (
		<TouchableOpacity style={styles.button} onPress={onPress}>
			<Ionicons name="camera" size={24} color="white" />
			<Text style={styles.text}>{text}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		backgroundColor: '#171817ff',
		borderRadius: 32,
		padding: 20,
		paddingVertical: 20,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-evenly',
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

export default ValideStepButton;
