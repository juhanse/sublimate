import React from 'react';
import { View, ScrollView, TextInput, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Entypo } from '@expo/vector-icons';
import { PosX } from '@/constants/Responsive';
import { Step } from '@/services/projectsQueries';

interface StepsFlowProps {
	steps: Step[];
}

export default function StepsFlow({ steps }: StepsFlowProps) {
	return (
		<ScrollView style={styles.container}>
			{steps.map((step) => {
				const deadline = new Date(step.deadline);

				return (
					<View style={styles.steps} key={step.id}>
						<View style={styles.step}>
							<Entypo name="menu" size={PosX(30)} color="#888888"/>
							<TextInput
								style={styles.stepName}
								placeholder={step.name}
								placeholderTextColor="rgba(227, 223, 217, 0.8)"
								multiline={true}
							/>
							<DateTimePicker
								testID="dateTimePicker"
								value={deadline}
								mode={'date'}
								is24Hour={true}
							/>
						</View>
					</View>
				);
			})}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	steps: {
		gap: PosX(10),
	},
	step: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: PosX(10),
		paddingHorizontal: PosX(20),
		width: '100%',
		height: PosX(80),
		gap: PosX(10),
		borderRadius: PosX(16),
		borderWidth: 1,
		borderColor: '#393939',
		backgroundColor: "#302C26"
	},
	stepName: {
		flex: 1,
		fontFamily: "SF-Medium",
		fontSize: PosX(18),
		color: "rgba(227, 223, 217, 0.8)"
	},
});
