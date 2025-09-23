import React from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "@/services/categoriesQueries";
import { Colors } from "@/constants/Colors";

interface Props {
	value: string[];
	onChange: (selected: string[]) => void;
	maxSelected?: number;
}

export default function CategorySelector({ value, onChange, maxSelected = 2 }: Props) {
	const categoriesQuery = useQuery({
		queryKey: ["categories", "FR"],
		queryFn: () => fetchCategories("FR"),
	});

	if (categoriesQuery.isLoading) return <Text>Loading...</Text>;
	if (categoriesQuery.isError) return <Text>Erreur lors du chargement</Text>;
	if (!categoriesQuery.data) return null;

	const toggleCategory = (id: string) => {
		if (value.includes(id)) {
			onChange(value.filter((catId) => catId !== id));
		} else {
			if (value.length < maxSelected) {
				onChange([...value, id]);
			}
		}
	};

	return (
		<View style={styles.listContainer}>
		{categoriesQuery.data.map((item) => {
			const isSelected = value.includes(item.id);

			return (
				<TouchableOpacity
					key={item.id}
					style={[styles.categoryButton, isSelected && styles.categoryButtonSelected]}
					onPress={() => toggleCategory(item.id)}
					activeOpacity={0.7}
				>
					<Text style={[styles.categoryText, isSelected && styles.categoryTextSelected]}>
						{item.name}
					</Text>
				</TouchableOpacity>
			);
		})}
		</View>
	);
};

const styles = StyleSheet.create({
	listContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 8,
	},
	categoryButton: {
		backgroundColor: "#f2f2f2",
		borderRadius: 20,
		paddingHorizontal: 16,
		paddingVertical: 14,
		borderWidth: 2,
		borderColor: "#ccc",
	},
	categoryButtonSelected: {
		backgroundColor: Colors.purple,
		borderColor: Colors.purple,
	},
	categoryText: {
		fontSize: 14,
		color: "#333",
		fontWeight: "600",
	},
	categoryTextSelected: {
		color: "#fff",
	},
});
