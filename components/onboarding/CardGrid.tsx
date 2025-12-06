import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { PosX } from '@/constants/Responsive';
import * as Haptics from 'expo-haptics';

export type CardItem = {
	label: string;
	value: string;
};

type CardGridProps = {
	items: CardItem[];
	multiSelect?: boolean;
	selectedValues?: string[];
	onSelectionChange?: (selectedValues: string[] | null) => void;
};

export default function CardGrid({
	items,
	multiSelect = false,
	selectedValues = [],
	onSelectionChange,
}: CardGridProps) {
	const [internalSelected, setInternalSelected] = useState<string[]>(selectedValues);

	const selected = selectedValues.length > 0 ? selectedValues : internalSelected;

	const handlePress = async (value: string) => {
		await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

		let newSelected: string[];

		if (multiSelect) {
			if (selected.includes(value)) {
				newSelected = selected.filter((v) => v !== value);
			} else {
				newSelected = [...selected, value];
			}
		} else {
			if (selected.includes(value)) {
				newSelected = [];
			} else {
				newSelected = [value];
			}
		}

		setInternalSelected(newSelected);
		onSelectionChange?.(newSelected.length > 0 ? newSelected : null);
	};

	return (
		<View style={styles.container}>
			{items.map((item, index) => {
				const isSelected = selected.includes(item.value);
				return (
					<Pressable
						key={`${item.value}-${index}`}
						style={[styles.card, isSelected && styles.cardSelected]}
						onPress={() => handlePress(item.value)}
					>
						<Text style={[styles.cardText, isSelected && styles.cardTextSelected]}>
							{item.label}
						</Text>
					</Pressable>
				);
			})}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: PosX(12),
	},
	card: {
		flex: 1,
		minWidth: '45%',
		paddingVertical: PosX(20),
		paddingHorizontal: PosX(16),
		borderRadius: PosX(12),
		backgroundColor: 'rgba(255, 255, 255, 0.08)',
		borderWidth: PosX(2),
		borderColor: 'transparent',
		alignItems: 'center',
		justifyContent: 'center',
	},
	cardSelected: {
		borderColor: '#FFFFFF',
		backgroundColor: 'rgba(255, 255, 255, 0.15)',
	},
	cardText: {
		fontFamily: 'SF-Medium',
		fontSize: PosX(16),
		color: 'rgba(255, 255, 255, 0.7)',
		textAlign: 'center',
	},
	cardTextSelected: {
		color: '#FFFFFF',
		fontFamily: 'SF-SemiBold',
	},
});
