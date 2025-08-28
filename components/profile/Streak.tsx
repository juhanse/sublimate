import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export type StreakDay = {
  date: Date;
  present: boolean;
};

export interface StreakProps {
  week: StreakDay[];
}

const dayLabels = ['L', 'M', 'M', 'J', 'V', 'S', 'D'];

export const Streak: React.FC<StreakProps> = ({ week }) => {
	return (
		<View style={styles.container}>
		{week.map((day, idx) => (
			<View key={day.date.toISOString()} style={styles.dayContainer}>
				<TouchableOpacity
					activeOpacity={0.8}
					style={[
					styles.circle,
					day.present && styles.circleActive,
					idx === new Date().getDay() - 1 && styles.circleToday,
					]}
				>
					<Ionicons
						name="flame"
						size={22}
						color={day.present ? '#fff' : '#bdbdbd'}
						style={day.present ? styles.flameActive : styles.flameInactive}
					/>
				</TouchableOpacity>
				<Text style={styles.dayLabel}>{dayLabels[idx]}</Text>
			</View>
		))}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		gap: 10,
	},
	dayContainer: {
		alignItems: 'center',
		flex: 1,
	},
	circle: {
		width: 38,
		height: 38,
		borderRadius: 19,
		backgroundColor: '#f2f2f2',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 4,
		borderWidth: 2,
		borderColor: '#e0e0e0',
		shadowColor: 'transparent',
		shadowOffset: { width: 0, height: 0 },
		shadowOpacity: 0,
		shadowRadius: 0,
		elevation: 0,
	},
	circleActive: {
		backgroundColor: '#ff9500',
		borderColor: '#ff9500',
		shadowColor: '#ff9500',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.35,
		shadowRadius: 6,
		elevation: 6,
	},
	circleToday: {
		borderColor: '#a46409ff',
		borderWidth: 3,
	},
	flameActive: {
		textShadowColor: '#fff3',
		textShadowOffset: { width: 0, height: 2 },
		textShadowRadius: 4,
	},
	flameInactive: {
		opacity: 0.5,
	},
	dayLabel: {
		fontSize: 13,
		color: '#fff',
		fontWeight: '600',
		textAlign: 'center',
		textShadowColor: '#0002',
		textShadowOffset: { width: 0, height: 1 },
		textShadowRadius: 2,
	},
});

export default Streak;
