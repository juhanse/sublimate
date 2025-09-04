import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { User } from '@/services/usersQueries';
import Streak from '@/components/profile/Streak';
import SettingsButton from '@/components/profile/SettingsButton';

export default function ProfileHeader({ user }: { user: User }) {
	const experiencePoints = user?.xp || 0;
	const nextLevelPoints = 3000;
	const progress = (experiencePoints / nextLevelPoints) * 100;

	const StreakDay = [
		{ date: new Date('2023-03-20'), present: true },
		{ date: new Date('2023-03-21'), present: false },
		{ date: new Date('2023-03-22'), present: true },
		{ date: new Date('2023-03-23'), present: true },
		{ date: new Date('2023-03-24'), present: false },
		{ date: new Date('2023-03-25'), present: false },
		{ date: new Date('2023-03-26'), present: false },
	];
	const StreaksProps = { week: StreakDay || [] };

	return (
		<View style={styles.outerContainer}>
			<LinearGradient
				colors={["#194eee6c", "#1f4dd96c", "rgba(222, 37, 84, 0.52)"]}
				style={StyleSheet.absoluteFill}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
			/>
			<BlurView intensity={60} tint="light" style={styles.container}>
				<View style={styles.rowAvatarName}>
					<Image source={{ uri: user?.avatar }} style={styles.avatarImageSmall} />

					<View style={styles.columnName}>
						<Text style={styles.userName}>👋 Salut, {user?.username || 'Invité'}</Text>
						<View style={styles.gradeBadge}>
							<LinearGradient colors={['#AF52DE' + '20', '#AF52DE' + '40']} style={styles.gradeBadgeGradient}>
								<Ionicons name={'diamond'} size={16} color={'#AF52DE'} />
								<Text style={[styles.gradeText, { color: '#AF52DE' }]}>
									{user?.ranks.name}
								</Text>
							</LinearGradient>
						</View>
					</View>

					<SettingsButton />
				</View>

				<View style={styles.progressBarRow}>
					<View style={styles.progressBar}>
						<LinearGradient
							colors={['#ff9500', '#c4770cff']}
							style={[styles.progressFill, { width: `${progress}%` }]}
							start={{ x: 0, y: 0 }}
							end={{ x: 1, y: 0 }}
						/>
					</View>
					<Text style={styles.progressPercentage}>{Math.round(progress)}%</Text>
				</View>

				<View style={styles.calendarRow}>
					<Streak week={StreaksProps.week}/>
				</View>
			</BlurView>
		</View>
	);
}

const styles = StyleSheet.create({
	outerContainer: {
		marginTop: -60,
		borderBottomLeftRadius: 60,
		borderBottomRightRadius: 60,
		overflow: 'hidden',
		marginHorizontal: 0,
		minHeight: 350,
	},
	container: {
		flex: 1,
		padding: 24,
		borderBottomLeftRadius: 60,
		borderBottomRightRadius: 60,
		shadowColor: '#000000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.1,
		shadowRadius: 12,
		elevation: 6,
		minHeight: 420,
	},
	rowAvatarName: {
		flexDirection: 'row',
		alignItems: 'flex-start',
		justifyContent: 'flex-start',
		marginTop: 50,
	},
	avatarImageSmall: {
		width: 100,
		height: 100,
		borderRadius: 50,
		borderWidth: 2,
		borderColor: '#fff',
		marginRight: 8,
	},
	columnName: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'flex-start',
		gap: 10,
	},
	progressBarRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 5,
		marginTop: 30,
	},
	calendarRow: {
		marginTop: 40,
	},
	userName: {
		fontSize: 28,
		fontWeight: 'bold',
		fontFamily: 'Borna',
		color: 'white',
	},
	gradeBadge: {
		borderRadius: 20,
		overflow: 'hidden',
	},
	gradeBadgeGradient: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 16,
		paddingVertical: 8,
		gap: 6,
	},
	gradeText: {
		fontSize: 14,
		fontWeight: '600',
	},
	progressBar: {
		flex: 1,
		height: 8,
		backgroundColor: '#F2F2F7',
		borderRadius: 4,
		overflow: 'hidden',
	},
	progressFill: {
		height: '100%',
		borderRadius: 4,
	},
	progressPercentage: {
		fontSize: 12,
		fontWeight: '600',
		color: '#ff9500',
		minWidth: 35,
		textAlign: 'right',
	},
	settingsButton: {
		position: 'absolute',
		top: 16,
		right: 16,
		width: 32,
		height: 32,
		borderRadius: 16,
		backgroundColor: '#F2F2F7',
		justifyContent: 'center',
		alignItems: 'center',
		zIndex: 1,
	},
});
