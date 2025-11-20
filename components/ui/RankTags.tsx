import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { PosX, PosY } from "@/constants/Responsive";

export interface RankTagProps {
	name: string;
	color: string;
}

export default function RankTags({ name, color }: RankTagProps) {
	return (
		<View style={[styles.container, { backgroundColor: `${color}4D` }]}>
			<FontAwesome name="trophy" size={PosX(10)} color={color} />
			<Text style={[styles.text, { color }]}>{name}</Text>
		</View>
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
