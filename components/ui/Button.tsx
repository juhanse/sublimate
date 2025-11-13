import React, { ReactNode } from "react";
import { Pressable, Text, ViewStyle, TextStyle, StyleSheet } from "react-native";

type ButtonType = "primary" | "secondary" | "warning";

interface ButtonProps {
	type?: ButtonType;
	onPress?: () => void;
	children: ReactNode;
	style?: ViewStyle;
	textStyle?: TextStyle;
}

const Button: React.FC<ButtonProps> = ({ type = "primary", onPress, children, style, textStyle }) => {
	const getBackgroundColor = (pressed: boolean) => {
		switch (type) {
			case "secondary":
				return pressed ? "#000000cc" : "#000000";
			case "warning":
				return pressed ? "#FF453Acc" : "#FF453A";
			default:
				return pressed ? "#FFFFFFcc" : "#FFFFFF";
		}
	};

	const getTextColor = () => {
		switch (type) {
			case "primary":
				return "#000000";
			default:
				return "#FFFFFF";
		}
	};

	return (
		<Pressable
			onPress={onPress}
			style={({ pressed }) => [
				styles.base,
				styles.shadow,
				{ backgroundColor: getBackgroundColor(pressed) },
				style,
			]}
		>
			<Text style={[styles.text, { color: getTextColor() }, textStyle]}>
				{children}
			</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	base: {
		width: '100%',
		height: 55,
		borderRadius: 36,
		paddingHorizontal: 20,
		paddingVertical: 8,
		alignItems: "center",
		justifyContent: "center",
		alignSelf: "stretch",
	},
	text: {
		fontFamily: "SF-Medium",
		fontSize: 20,
	},
	shadow: {
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 4,
	},
});

export default Button;
