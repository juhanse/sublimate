import { Pressable, View, Image, StyleSheet } from "react-native";
import { ThemedText } from "@/components/ThemedText";

interface GoogleButtonProps {
	radius: number;
	onPress: () => void;
}

export default function GoogleButton({ onPress, radius }: GoogleButtonProps) {
	return (
		<Pressable onPress={onPress}>
			<View style={styles.button}>
				<Image source={require("@/assets/images/google-icon.png")} style={styles.icon}/>
				<ThemedText type="defaultSemiBold" darkColor="#000">
					Continue with Google
				</ThemedText>
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	button: {
		width: "100%",
		height: 56,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 18,
		backgroundColor: "#fff",
		borderWidth: 1,
		borderColor: "#ccc",
	},
	icon: {
		width: 18,
		height: 18,
		marginRight: 6,
	},
});
