import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface DayData {
	day: string;
	dayNumber: number;
	isCompleted: boolean;
	isToday: boolean;
	isFuture: boolean;
}

interface StreakCalendarProps {
	completedDays?: number[];
	onDayPress?: (dayNumber: number) => void;
	streakCount?: number;
}

const DAYS = ['LU', 'MA', 'ME', 'JE', 'VE', 'SA', 'DI'];

export default function StreakCalendar({ completedDays = [], onDayPress, streakCount = 0 }: StreakCalendarProps) {
	const [animatedValues] = useState(() =>
		DAYS.map(() => new Animated.Value(0))
	);

	useEffect(() => {
		completedDays.forEach((dayIndex) => {
			if (dayIndex >= 0 && dayIndex < 7) {
				Animated.spring(animatedValues[dayIndex], {
					toValue: 1,
					useNativeDriver: true,
					tension: 80,
					friction: 6,
				}).start();
			}
		});
	}, [completedDays]);

	const getCurrentWeekDays = (): DayData[] => {
		const today = new Date();
		const currentDay = today.getDay();
		const mondayIndex = currentDay === 0 ? 6 : currentDay - 1;

		const startOfWeek = new Date(today);
		startOfWeek.setDate(today.getDate() - mondayIndex);

		return DAYS.map((day, index) => {
			const dayDate = new Date(startOfWeek);
			dayDate.setDate(startOfWeek.getDate() + index);
			
			const isToday = dayDate.toDateString() === today.toDateString();
			const isFuture = dayDate > today;
			const isCompleted = completedDays.includes(index);

			return {
				day,
				dayNumber: dayDate.getDate(),
				isCompleted,
				isToday,
				isFuture,
			};
		});
	};

	const weekDays = getCurrentWeekDays();

	const renderDay = (dayData: DayData, index: number) => {
		const { day, dayNumber, isCompleted, isToday, isFuture } = dayData;

		const animatedScale = animatedValues[index].interpolate({
			inputRange: [0, 1],
			outputRange: [0.3, 1],
		});

		const animatedRotation = animatedValues[index].interpolate({
			inputRange: [0, 1],
			outputRange: ['0deg', '360deg'],
		});

		return (
			<TouchableOpacity
				key={index}
				style={styles.dayContainer}
				onPress={() => onDayPress && onDayPress(index)}
				activeOpacity={0.7}
			>
				<Text style={[styles.dayLabel, isToday && styles.todayLabel]}>
					{day}
				</Text>
				
				<View style={styles.dayBubble}>
					<View style={[
						styles.bubble,
						isToday && styles.todayBubble,
						isFuture && styles.futureBubble,
						isCompleted && styles.completedBubble,
					]}>
						<Text style={[
							styles.dayNumber,
							isToday && styles.todayDayNumber,
							isCompleted && styles.completedDayNumber,
							isFuture && styles.futureDayNumber,
						]}>
							{dayNumber}
						</Text>

						{isCompleted && (
							<Animated.View
								style={[
									styles.flameContainer,
									{
										transform: [
											{ scale: animatedScale },
											{ rotate: animatedRotation },
										],
									},
								]}
							>
								<LinearGradient
									colors={['#FF6B35', '#F7931E', '#FFD23F']}
									style={styles.flameGradient}
									start={{ x: 0, y: 1 }}
									end={{ x: 0, y: 0 }}
								>
									<Ionicons name="flame" size={16} color="#FFFFFF" />
								</LinearGradient>
							</Animated.View>
						)}
					</View>
				</View>
			</TouchableOpacity>
		);
	};

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<View style={styles.streakInfo}>
					<View style={styles.streakIcon}>
						<Ionicons name="flame" size={20} color="#FF6B35" />
					</View>
					<View>
						<Text style={styles.streakNumber}>{streakCount}</Text>
						<Text style={styles.streakLabel}>jours consécutifs</Text>
					</View>
				</View>
				
				<View style={styles.weekProgress}>
					<Text style={styles.progressText}>
						{completedDays.length}/7 cette semaine
					</Text>
					<View style={styles.progressBar}>
						<View 
							style={[
								styles.progressFill, 
								{ width: `${(completedDays.length / 7) * 100}%` }
							]} 
						/>
					</View>
				</View>
			</View>

			<View style={styles.calendar}>
				{weekDays.map((dayData, index) => renderDay(dayData, index))}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#FFFFFF',
		borderRadius: 16,
		padding: 16,
		marginHorizontal: 16,
		marginVertical: 8,
		shadowColor: '#000000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 4,
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 16,
	},
	streakInfo: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	streakIcon: {
		width: 32,
		height: 32,
		borderRadius: 16,
		backgroundColor: '#FFF5F0',
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 8,
	},
	streakNumber: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#1D1D1F',
	},
	streakLabel: {
		fontSize: 12,
		color: '#8E8E93',
	},
	weekProgress: {
		alignItems: 'flex-end',
	},
	progressText: {
		fontSize: 12,
		color: '#8E8E93',
		marginBottom: 4,
	},
	progressBar: {
		width: 60,
		height: 4,
		backgroundColor: '#F2F2F7',
		borderRadius: 2,
		overflow: 'hidden',
	},
	progressFill: {
		height: '100%',
		backgroundColor: '#34C759',
		borderRadius: 2,
	},
	calendar: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	dayContainer: {
		alignItems: 'center',
		flex: 1,
	},
	dayLabel: {
		fontSize: 12,
		fontWeight: '500',
		color: '#8E8E93',
		marginBottom: 6,
	},
	todayLabel: {
		color: '#007AFF',
		fontWeight: '600',
	},
	dayBubble: {
		position: 'relative',
		alignItems: 'center',
		justifyContent: 'center',
	},
	bubble: {
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: '#F2F2F7',
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 2,
		borderColor: 'transparent',
	},
	todayBubble: {
		backgroundColor: '#E3F2FD',
		borderColor: '#007AFF',
	},
	futureBubble: {
		backgroundColor: '#F9F9F9',
		borderColor: '#E5E5EA',
	},
	completedBubble: {
		backgroundColor: '#E8F5E8',
		borderColor: '#34C759',
	},
	dayNumber: {
		fontSize: 14,
		fontWeight: '600',
		color: '#8E8E93',
	},
	todayDayNumber: {
		color: '#007AFF',
	},
	futureDayNumber: {
		color: '#C7C7CC',
	},
	completedDayNumber: {
		color: '#34C759',
	},
	flameContainer: {
		position: 'absolute',
		top: -8,
		right: -8,
		width: 24,
		height: 24,
		borderRadius: 12,
		overflow: 'hidden',
		shadowColor: '#FF6B35',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
		elevation: 4,
	},
	flameGradient: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});
