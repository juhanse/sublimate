import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo } from '@expo/vector-icons';
import RankTags from "@/components/ui/RankTags";
import { PosX, PosY } from "@/constants/Responsive";
import { User } from "@/services/usersQueries";
// import Streaks from "./Streaks";

interface HeaderProps {
	user: User;
}

export default function Header({ user }: HeaderProps) {
	const progress = Math.min(user.xp / 100, 1);

	return (
		<View style={styles.container}>
			<Image
				source={{ uri: user.avatar }}
				style={styles.avatar}
			/>

			<View style={styles.infoContainer}>
				<View style={styles.topRow}>
					<Text style={styles.username}>👋 Salut, {user.username}</Text>
					<Entypo name="chevron-right" size={PosX(35)} color="#D9D9D9" />
				</View>

				<RankTags name={"Légende"} color="#ED5C5C" />
			
				<View style={styles.progressBarBackground}>
					<LinearGradient
						colors={["#F77E75", "#ED5C5C"]}
						start={{ x: 0, y: 0 }}
						end={{ x: 1, y: 0 }}
						style={[styles.progressFill, { width: `${progress * 100}%` }]}
					/>
				</View>

				{/* <Streaks streak={user.streak} /> */}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		width: "100%",
		height: PosY(200),
		backgroundColor: "#FFFFFF",
		paddingHorizontal: PosX(20),
		paddingVertical: PosY(40),
		flexDirection: "row",
		alignItems: "flex-end",
		gap: PosX(10),
		borderBottomLeftRadius: PosX(46),
		borderBottomRightRadius: PosX(46),
		shadowColor: "#000",
		shadowOpacity: 0.08,
		shadowRadius: 10,
		shadowOffset: { width: 0, height: 2 },
		elevation: 4,
	},
	avatar: {
		width: PosX(100),
		height: PosX(100),
		borderRadius: PosX(100),
	},
	infoContainer: {
		flex: 1,
		flexDirection: "column",
		gap: PosY(8),
	},
	topRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		height: PosY(35),
	},
	username: {
		fontSize: PosY(20),
		color: "#111111",
		fontFamily: "SF-Semibold",
	},
	progressBarBackground: {
		width: "100%",
		height: PosY(7),
		backgroundColor: "#D9D9D9",
		borderRadius: PosY(36),
		overflow: "hidden",
	},
	progressFill: {
		height: "100%",
		borderRadius: PosY(36),
	},
});
