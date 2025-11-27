import React from "react";
import { View, Text, ImageBackground, Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { PosX, PosY } from "@/constants/Responsive";
import { LinearGradient } from "expo-linear-gradient";

interface ProjectCardProps {
	image: string;
	name: string;
	currentStep: string;
	deadline: string;
	onPress: () => void;
}

export default function ProjectCard({ image, name, currentStep, deadline, onPress }: ProjectCardProps) {
	const formattedDeadline = new Date(deadline).toLocaleDateString("en-GB", {
		day: "2-digit",
		month: "2-digit",
	});

	return (
		<Pressable style={styles.card} onPress={onPress}>
			<ImageBackground
				source={{ uri: image }}
				style={styles.image}
				resizeMode="cover"
				imageStyle={styles.imageRadius}
			>
				<LinearGradient
					colors={["rgba(0, 0, 0, 0)", "rgba(0,0,0,0.6)"]}
					start={{ x: 0.5, y: 0 }}
					end={{ x: 0.5, y: 1 }}
					style={[StyleSheet.absoluteFill, { borderRadius: 40 }]}
				/>

				<View style={styles.deadlineContainer}>
					<Ionicons name="timer-outline" size={24} color="#FFFFFF" />
					<Text style={styles.deadlineText}>{formattedDeadline}</Text>
				</View>

				<View style={styles.textContainer}>
					<Text style={styles.projectName}>{name}</Text>
					<Text style={styles.projectStep}>{currentStep}</Text>
				</View>
			</ImageBackground>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	card: {
		width: PosX(290),
		height: PosY(430),
		borderRadius: 40,
		overflow: "hidden",
	},
	image: {
		flex: 1,
		justifyContent: "space-between",
	},
	imageRadius: {
		borderRadius: 40,
	},
	deadlineContainer: {
		position: "absolute",
		top: PosY(22),
		left: PosX(24),
		flexDirection: "row",
		alignItems: "center",
		gap: PosX(6),
		backgroundColor: "rgba(0,0,0,0.2)",
		borderRadius: 16,
		paddingHorizontal: PosX(10),
		paddingVertical: PosY(6),
	},
	deadlineText: {
		fontFamily: "SF-Medium",
		fontSize: 16,
		color: "#FFFFFF",
	},
	textContainer: {
		position: "absolute",
		bottom: PosY(20),
		width: "100%",
		alignItems: "center",
		paddingHorizontal: PosX(10),
		gap: PosY(4),
	},
	projectName: {
		fontFamily: "SF-Semibold",
		fontSize: 28,
		color: "#FFFFFF",
		textAlign: "center",
	},
	projectStep: {
		fontFamily: "SF-Regular",
		fontSize: 16,
		color: "#FFFFFF",
		textAlign: "center",
	},
});
