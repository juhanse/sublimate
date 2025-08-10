import React from 'react';
import { Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Colors } from '@/constants/Colors';

type ValideStepButtonProps = {
	text: string;
	onPress: () => void;
};

const ValideStepButton: React.FC<ValideStepButtonProps> = ({ text, onPress }) => {
	return (
		<TouchableOpacity style={styles.button} onPress={onPress}>
			<Image
				source={require('@/assets/images/target.png')}
				style={styles.image}
			/>
			<Text style={styles.text}>{text}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	button: {
		backgroundColor: Colors.purple,
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
	image: {
		width: 28,
		height: 28,
		marginRight: 8,
	},
});

export default ValideStepButton;
