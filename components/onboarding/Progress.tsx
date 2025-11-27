import React from 'react';
import { View, StyleSheet } from 'react-native';

interface ProgressProps {
	progress: number;
}

export default function Progress({ progress }: ProgressProps) {
	return (
		<View style={styles.container}>
			<View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		height: 8,
		width: '100%',
		backgroundColor: '#D9D9D9',
		borderRadius: 4,
		overflow: 'hidden',
	},
	progressBar: {
		height: '100%',
		backgroundColor: '#ffffff',
	},
});
