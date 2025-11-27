import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

interface TextEntryProps {
	placeholder?: string;
	value: string;
	onChangeText: (text: string) => void;
	multiline?: boolean;
}

export default function TextEntry({ placeholder, value, onChangeText, multiline = false }: TextEntryProps) {
	return (
		<View style={styles.container}>
			<TextInput
				style={[styles.input, multiline && styles.multilineInput]}
				placeholder={placeholder}
				value={value}
				onChangeText={onChangeText}
				multiline={multiline}
				textAlignVertical={multiline ? 'top' : 'center'}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
	},
	input: {
		height: 50,
		borderColor: '#ccc',
		borderWidth: 1,
		borderRadius: 8,
		paddingHorizontal: 12,
		fontSize: 16,
		backgroundColor: 'white',
	},
	multilineInput: {
		height: 150,
		paddingTop: 12,
	},
});
