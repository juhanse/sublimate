import React from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import { PosX, PosY } from "@/constants/Responsive";

export interface CategoryTagProps {
	name: string;
	isPressed?: boolean;
}

export default function CategoryTags({ name, isPressed = false }: CategoryTagProps) {
	const backgroundColor = isPressed ? "#000000" : "#D9D9D9";
	const color = isPressed ? "#FFFFFF" : "#000000";

	return (
		<Pressable style={[styles.container, { backgroundColor }]}>
			<Text style={[styles.text, { color }]}>{name}</Text>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		padding: PosX(4),
		borderRadius: PosX(5),
		gap: PosX(2),
		alignSelf: "flex-start",
	},

	text: {
		fontFamily: "Borna",
		fontSize: PosY(10),
	},
});
