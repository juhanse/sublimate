import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { Category, fetchCategories } from '@/services/categoriesQueries';
import { PosY } from "@/constants/Responsive";
import CategoryTags from "@/components/ui/CategoryTags";

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
		return <ActivityIndicator color="white" size="small" />;
	}

	return (
		<View style={styles.container}>
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
		gap: PosY(5),
	},
	tagWrapper: {
		marginRight: 5,
		marginBottom: 5,
	},
});
