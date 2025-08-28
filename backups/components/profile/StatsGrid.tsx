import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { UserStats } from '../../app/(tabs)/profile';

interface StatsGridProps {
	stats: UserStats;
}

interface StatCardProps {
	title: string;
	value: string;
	icon: string;
	gradient: readonly [string, string];
	subtitle?: string;
}

function StatCard({ title, value, icon, gradient, subtitle }: StatCardProps) {
	return (
		<View style={styles.statCard}>
			<LinearGradient
				colors={gradient}
				style={styles.statGradient}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
			>
				<View style={styles.statContent}>
					<View style={styles.statIcon}>
						<Ionicons name={icon as any} size={20} color="#FFFFFF" />
					</View>
					
					<View style={styles.statInfo}>
						<Text style={styles.statValue}>{value}</Text>
						<Text style={styles.statTitle}>{title}</Text>
						{subtitle && (
						<Text style={styles.statSubtitle}>{subtitle}</Text>
						)}
					</View>
				</View>
			</LinearGradient>
		</View>
	);
}

export default function StatsGrid({ stats }: StatsGridProps) {
	const statsData = [
		{
			title: 'Projets',
			value: stats.projectsCompleted.toString(),
			subtitle: 'réalisés',
			icon: 'checkmark-circle',
			gradient: ['#667eea', '#764ba2'] as [string, string],
		},
		{
			title: 'Heures',
			value: `${stats.totalHours}h`,
			subtitle: 'au total',
			icon: 'time',
			gradient: ['#f093fb', '#f5576c'] as [string, string],
		},
		{
			title: 'Trophées',
			value: stats.trophiesEarned.toString(),
			subtitle: 'obtenus',
			icon: 'trophy',
			gradient: ['#ffecd2', '#fcb69f'] as [string, string],
		},
		{
			title: 'Jours',
			value: stats.activeDays.toString(),
			subtitle: 'd\'activité',
			icon: 'calendar',
			gradient: ['#a8edea', '#fed6e3'] as [string, string],
		},
	];

	return (
		<View style={styles.container}>
			<Text style={styles.sectionTitle}>Statistiques</Text>
			<View style={styles.grid}>
				{statsData.map((stat, index) => (
				<StatCard
					key={index}
					title={stat.title}
					value={stat.value}
					subtitle={stat.subtitle}
					icon={stat.icon}
					gradient={stat.gradient}
				/>
				))}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 16,
		marginTop: 24,
	},
	sectionTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#1D1D1F',
		marginBottom: 16,
	},
	grid: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 12,
		justifyContent: 'space-between',
	},
	statCard: {
		width: '48%',
		height: 100,
		borderRadius: 16,
		overflow: 'hidden',
		shadowColor: '#000000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 4,
	},
	statGradient: {
		flex: 1,
		padding: 16,
	},
	statContent: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
	},
	statIcon: {
		width: 36,
		height: 36,
		borderRadius: 18,
		backgroundColor: 'rgba(255, 255, 255, 0.2)',
		justifyContent: 'center',
		alignItems: 'center',
		marginRight: 12,
	},
	statInfo: {
		flex: 1,
	},
	statValue: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#FFFFFF',
		marginBottom: 2,
	},
	statTitle: {
		fontSize: 12,
		color: '#FFFFFF',
		opacity: 0.9,
		fontWeight: '500',
	},
	statSubtitle: {
		fontSize: 10,
		color: '#FFFFFF',
		opacity: 0.7,
	},
});
