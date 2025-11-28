import { PosY } from '@/constants/Responsive';
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
		width: '100%',
		height: PosY(12),
		borderRadius: 30,
		overflow: 'hidden',
		backgroundColor: '#D9D9D9',
	},
	progressBar: {
		height: '100%',
		backgroundColor: '#ffffff',
	},
});
