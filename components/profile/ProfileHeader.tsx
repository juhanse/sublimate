import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

type User = {
	id: string;
	name: string;
	email: string;
};

interface ProfileHeaderProps {
	user: User | null;
	onAvatarEdit: () => void;
}

const GRADES = {
	'Débutant': { color: '#8E8E93', icon: 'leaf', level: 1 },
	'Apprenti': { color: '#34C759', icon: 'trending-up', level: 2 },
	'Expert': { color: '#007AFF', icon: 'star', level: 3 },
	'Maître': { color: '#AF52DE', icon: 'diamond', level: 4 },
	'Légende': { color: '#FF9500', icon: 'flame', level: 5 },
};

export default function ProfileHeader({ user, onAvatarEdit }: ProfileHeaderProps) {
	const currentGrade = 'Expert';
	const gradeInfo = GRADES[currentGrade];
	const experiencePoints = 2450;
	const nextLevelPoints = 3000;
	const progress = (experiencePoints / nextLevelPoints) * 100;

	const getInitials = (name: string) => {
		return name
		.split(' ')
		.map(word => word.charAt(0))
		.join('')
		.toUpperCase()
		.slice(0, 2);
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity 
				style={styles.settingsButton}
				onPress={() => router.push('/settings')}
			>
				<Ionicons name="settings-outline" size={24} color="#007AFF" />
			</TouchableOpacity>
			<View style={styles.avatarSection}>
				<TouchableOpacity 
					style={styles.avatarContainer}
					onPress={onAvatarEdit}
					activeOpacity={0.8}
				>
					<View style={styles.avatarWrapper}>
						<LinearGradient
							colors={['#667eea', '#764ba2']}
							style={styles.avatarGradient}
							start={{ x: 0, y: 0 }}
							end={{ x: 1, y: 1 }}
						>
							<Text style={styles.avatarText}>
								{user?.name ? getInitials(user.name) : 'U'}
							</Text>
						</LinearGradient>

						<View style={styles.editBadge}>
							<LinearGradient
								colors={['#667eea', '#764ba2']}
								style={styles.editBadgeGradient}
							>
								<Ionicons name="camera" size={12} color="#FFFFFF" />
							</LinearGradient>
						</View>

						<View style={styles.levelBadge}>
							<Text style={styles.levelText}>{gradeInfo.level}</Text>
						</View>
					</View>
				</TouchableOpacity>

				<View style={styles.userInfo}>
					<Text style={styles.userName}>{user?.name || 'Utilisateur'}</Text>
					<Text style={styles.userEmail}>{user?.email || 'email@example.com'}</Text>

					<View style={styles.gradeBadge}>
						<LinearGradient
							colors={[gradeInfo.color + '20', gradeInfo.color + '40']}
							style={styles.gradeBadgeGradient}
						>
							<Ionicons 
								name={gradeInfo.icon as any} 
								size={16} 
								color={gradeInfo.color} 
							/>
							<Text style={[styles.gradeText, { color: gradeInfo.color }]}>
								{currentGrade}
							</Text>
						</LinearGradient>
					</View>
				</View>
			</View>

			<View style={styles.experienceSection}>
				<View style={styles.experienceHeader}>
					<View style={styles.experienceInfo}>
						<Ionicons name="flash" size={16} color="#667eea" />
						<Text style={styles.experienceLabel}>Expérience</Text>
					</View>
					<Text style={styles.experiencePoints}>
						{experiencePoints.toLocaleString()} / {nextLevelPoints.toLocaleString()} XP
					</Text>
				</View>
				<View style={styles.progressBarContainer}>
					<View style={styles.progressBar}>
						<LinearGradient
							colors={['#667eea', '#764ba2']}
							style={[styles.progressFill, { width: `${progress}%` }]}
							start={{ x: 0, y: 0 }}
							end={{ x: 1, y: 0 }}
						/>
					</View>
					<Text style={styles.progressPercentage}>{Math.round(progress)}%</Text>
				</View>
				<Text style={styles.nextLevelText}>
					{nextLevelPoints - experiencePoints} XP pour atteindre Maître
				</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#FFFFFF',
		marginTop: -60,
		marginHorizontal: 16,
		borderRadius: 20,
		padding: 24,
		shadowColor: '#000000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.1,
		shadowRadius: 12,
		elevation: 6,
	},
	avatarSection: {
		alignItems: 'center',
		marginBottom: 24,
	},
	avatarContainer: {
		marginBottom: 16,
	},
	avatarWrapper: {
		position: 'relative',
	},
	avatarGradient: {
		width: 100,
		height: 100,
		borderRadius: 50,
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 4,
		borderColor: '#FFFFFF',
	},
	avatarText: {
		fontSize: 32,
		fontWeight: 'bold',
		color: '#FFFFFF',
	},
	editBadge: {
		position: 'absolute',
		bottom: 4,
		right: 4,
		borderRadius: 16,
		overflow: 'hidden',
		borderWidth: 2,
		borderColor: '#FFFFFF',
	},
	editBadgeGradient: {
		width: 32,
		height: 32,
		justifyContent: 'center',
		alignItems: 'center',
	},
	levelBadge: {
		position: 'absolute',
		top: -4,
		left: -4,
		width: 28,
		height: 28,
		borderRadius: 14,
		backgroundColor: '#FF9500',
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 3,
		borderColor: '#FFFFFF',
		shadowColor: '#FF9500',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.3,
		shadowRadius: 4,
		elevation: 4,
	},
	levelText: {
		fontSize: 12,
		fontWeight: 'bold',
		color: '#FFFFFF',
	},
	userInfo: {
		alignItems: 'center',
	},
	userName: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#1D1D1F',
		marginBottom: 4,
	},
	userEmail: {
		fontSize: 16,
		color: '#8E8E93',
		marginBottom: 12,
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
	experienceSection: {
		marginTop: 8,
	},
	experienceHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 8,
	},
	experienceInfo: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6,
	},
	experienceLabel: {
		fontSize: 16,
		fontWeight: '600',
		color: '#1D1D1F',
	},
	experiencePoints: {
		fontSize: 14,
		color: '#8E8E93',
		fontWeight: '500',
	},
	progressBarContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
		marginBottom: 8,
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
		color: '#667eea',
		minWidth: 35,
		textAlign: 'right',
	},
	nextLevelText: {
		fontSize: 12,
		color: '#8E8E93',
		textAlign: 'center',
		fontStyle: 'italic',
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
