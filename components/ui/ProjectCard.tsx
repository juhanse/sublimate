import React from "react";
import { View, Text, ImageBackground, Pressable, StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { PosX, PosY } from "@/constants/Responsive";

interface ProjectCardProps {
	image: string;
	name: string;
	currentStep: string;
	deadline: string;
	onPress: () => void;
}

export default function ProjectCard({ image, name, currentStep, deadline, onPress }: ProjectCardProps) {
	return (
		<Pressable style={styles.card} onPress={onPress}>
			<ImageBackground
				source={{ uri: image }}
				style={styles.image}
				resizeMode="cover"
				imageStyle={styles.imageRadius}
			>
				<View style={styles.gradientOverlay} />

				<BlurView intensity={40} tint="dark" style={styles.deadlineContainer}>
					<Ionicons name="timer-outline" size={24} color="#FFFFFF" />
					<Text style={styles.deadlineText}>{deadline}</Text>
				</BlurView>

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
	gradientOverlay: {
		position: "absolute",
		bottom: 0,
		width: "100%",
		height: "50%",
		backgroundColor: "rgba(0, 0, 0, 0.4)",
		backdropFilter: "blur(6px)",
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
