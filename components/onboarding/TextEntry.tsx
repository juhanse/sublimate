import React from 'react';
import { View, TextInput, StyleSheet, ViewStyle } from 'react-native';

interface TextEntryProps {
	placeholder?: string;
	value: string;
	onChangeText: (text: string) => void;
	multiline?: boolean;
}

export default function TextEntry({ placeholder, value, onChangeText, multiline = false }: TextEntryProps) {
	const isWriting = value && value.length > 0;

	return (
		<View style={styles.container}>
			<View style={styles.row}>
				<View
					style={[
						styles.indicator,
						isWriting ? styles.indicatorActive : styles.indicatorInactive,
						{ alignSelf: multiline ? 'flex-start' : 'center' } as ViewStyle,
					]}
				/>

				<TextInput
					style={[styles.input, multiline && styles.multilineInput]}
					placeholder={placeholder}
					placeholderTextColor="rgba(162,162,162,0.5)"
					value={value}
					onChangeText={onChangeText}
					multiline={multiline}
					textAlignVertical={multiline ? 'top' : 'center'}
					autoCorrect={false}
				/>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		backgroundColor: 'transparent',
	},
	row: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 20,
	},
	indicator: {
		width: 2,
		borderRadius: 2,
	},
	indicatorInactive: {
		height: 30,
		backgroundColor: 'rgba(169,169,169,0.25)',
		opacity: 0.5,
	},
	indicatorActive: {
		height: 50,
		backgroundColor: '#D9D9D9',
		opacity: 1,
	},
	input: {
		flex: 1,
		height: 50,
		paddingHorizontal: 0,
		fontSize: 32,
		fontFamily: 'SF-Semibold',
		color: 'rgba(162,162,162,0.8)',
		backgroundColor: 'transparent',
	},
	multilineInput: {
		height: 150,
		paddingTop: 12,
	},
});
