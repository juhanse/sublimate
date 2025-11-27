import React from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import CategoryTags from "@/components/ui/CategoryTags";
import { useQuery } from "@tanstack/react-query";
import { Category, fetchCategories } from '@/services/categoriesQueries';

type ProjectCategory = {
	categories: {
		id: string;
		name: string;
		lang: string;
		updated_at: string;
		created_at: string;
	};
};

type CategorySelectorProps = {
  	categories?: ProjectCategory[];
};

export default function CategorySelector({ categories }: CategorySelectorProps) {
	const categoriesQuery = useQuery({
		queryKey: ['categories'],
		queryFn: () => fetchCategories(),
	});

	if (categoriesQuery.isLoading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator color="white" size="small" />
			</View>
		);
	}

	return (
		<View>
			{categoriesQuery.data?.map((cat) => (
				<CategoryTags
					key={cat.id}
					name={cat.name}
					isPressed={
						categories?.some((pc) => pc.categories.id === cat.id) ?? false
					}
				/>
			))}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		flexWrap: "wrap",
		alignItems: "flex-start",
		justifyContent: "flex-start",
		paddingVertical: 10,
		// paddingHorizontal: 0,
	},
	tagWrapper: {
		marginRight: 5,
		marginBottom: 5,
	},
	loadingContainer: {
		paddingVertical: 10,
	},
});
