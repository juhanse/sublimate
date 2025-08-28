import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ColorValue } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Trophy } from '../../app/(tabs)/profile';

interface TrophiesListProps {
	trophies: Trophy[];
}

interface TrophyCardProps {
	trophy: Trophy;
	onPress?: () => void;
}

const RARITY_COLORS: Record<string, [ColorValue, ColorValue]> = {
	bronze: ['#CD7F32', '#E6A85C'],
	silver: ['#C0C0C0', '#E8E8E8'],
	gold: ['#FFD700', '#FFED4E'],
	diamond: ['#B9F2FF', '#A8E6CF'],
};

function TrophyCard({ trophy, onPress }: TrophyCardProps) {
	const colors = RARITY_COLORS[trophy.rarity];

	return (
		<TouchableOpacity 
			style={styles.trophyCard}
			onPress={onPress}
			activeOpacity={0.8}
		>
			<LinearGradient
				colors={colors}
				style={styles.trophyGradient}
				start={{ x: 0, y: 0 }}
				end={{ x: 1, y: 1 }}
			>
				<View style={styles.trophyContent}>
					<View style={styles.trophyIconContainer}>
						<Ionicons 
							name={trophy.icon as any} 
							size={24} 
							color="#FFFFFF"
						/>
					</View>
					<View style={styles.rarityBadge}>
						<Text style={styles.rarityText}>
						{trophy.rarity.toUpperCase()}
						</Text>
					</View>
				</View>
			</LinearGradient>
			<Text style={styles.trophyName} numberOfLines={2}>
				{trophy.name}
			</Text>
		</TouchableOpacity>
	);
}

export default function TrophiesList({ trophies }: TrophiesListProps) {
	const handleTrophyPress = (trophy: Trophy) => {
		console.log('Trophy pressed:', trophy);
	};

	return (
		<View style={styles.container}>
			<View style={styles.sectionHeader}>
				<Text style={styles.sectionTitle}>Trophées</Text>
				<View style={styles.trophyCounter}>
					<Ionicons name="trophy" size={16} color="#FF9500" />
					<Text style={styles.counterText}>{trophies.length}</Text>
				</View>
			</View>

			<ScrollView
				horizontal
				showsHorizontalScrollIndicator={false}
				contentContainerStyle={styles.scrollContent}
				style={styles.scrollView}
			>
				{trophies.map((trophy) => (
				<TrophyCard
					key={trophy.id}
					trophy={trophy}
					onPress={() => handleTrophyPress(trophy)}
				/>
				))}
				
				<View style={styles.emptyTrophyCard}>
					<View style={styles.emptyTrophyContent}>
						<Ionicons name="add" size={24} color="#C7C7CC" />
						<Text style={styles.emptyTrophyText}>Plus à venir...</Text>
					</View>
				</View>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 16,
		marginTop: 24,
	},
	sectionHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 16,
	},
	sectionTitle: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#1D1D1F',
	},
	trophyCounter: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#FFF5F0',
		paddingHorizontal: 8,
		paddingVertical: 4,
		borderRadius: 12,
		gap: 4,
	},
	counterText: {
		fontSize: 14,
		fontWeight: '600',
		color: '#FF9500',
	},
	scrollView: {
		marginHorizontal: -16,
	},
	scrollContent: {
		paddingHorizontal: 16,
		gap: 12,
	},
	trophyCard: {
		width: 100,
		alignItems: 'center',
	},
	trophyGradient: {
		width: 80,
		height: 80,
		borderRadius: 20,
		marginBottom: 8,
		shadowColor: '#000000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.2,
		shadowRadius: 8,
		elevation: 6,
	},
	trophyContent: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		position: 'relative',
	},
	trophyIconContainer: {
		width: 48,
		height: 48,
		borderRadius: 24,
		backgroundColor: 'rgba(255, 255, 255, 0.2)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	rarityBadge: {
		position: 'absolute',
		top: 6,
		right: 6,
		backgroundColor: 'rgba(0, 0, 0, 0.3)',
		paddingHorizontal: 6,
		paddingVertical: 2,
		borderRadius: 8,
	},
	rarityText: {
		fontSize: 8,
		fontWeight: 'bold',
		color: '#FFFFFF',
	},
	trophyName: {
		fontSize: 12,
		fontWeight: '500',
		color: '#1D1D1F',
		textAlign: 'center',
		lineHeight: 16,
	},
	emptyTrophyCard: {
		width: 100,
		alignItems: 'center',
	},
	emptyTrophyContent: {
		width: 80,
		height: 80,
		borderRadius: 20,
		backgroundColor: '#F2F2F7',
		justifyContent: 'center',
		alignItems: 'center',
		borderWidth: 2,
		borderColor: '#E5E5EA',
		borderStyle: 'dashed',
		marginBottom: 8,
	},
	emptyTrophyText: {
		fontSize: 10,
		color: '#C7C7CC',
		textAlign: 'center',
		marginTop: 4,
	},
});
