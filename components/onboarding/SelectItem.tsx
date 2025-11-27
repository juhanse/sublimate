import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface SelectItemProps {
	items: string[];
	selectedItem: string | null;
	onSelect: (item: string) => void;
}

export default function SelectItem({ items, selectedItem, onSelect }: SelectItemProps) {
	return (
		<View style={styles.container}>
			{items.map((item) => (
				<TouchableOpacity
					key={item}
					style={styles.itemContainer}
					onPress={() => onSelect(item)}
				>
					<View style={[styles.checkbox, selectedItem === item && styles.checkboxSelected]}>
						{selectedItem === item && <View style={styles.checkboxInner} />}
					</View>
					<Text style={styles.itemText}>{item}</Text>
				</TouchableOpacity>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: '100%',
	},
	itemContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 12,
	},
	checkbox: {
		width: 24,
		height: 24,
		borderRadius: 12,
		borderWidth: 2,
		borderColor: '#ccc',
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 12,
	},
	checkboxSelected: {
		borderColor: '#007AFF',
	},
	checkboxInner: {
		width: 12,
		height: 12,
		borderRadius: 6,
		backgroundColor: '#007AFF',
	},
	itemText: {
		fontSize: 16,
		color: '#333',
	},
});
