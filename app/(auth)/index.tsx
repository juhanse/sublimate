import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import { Link, router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function AuthentificationScreen() {
	const [seenOnboarding, setSeenOnboarding] = useState(false);

	return (
		<View style={styles.container}>
			<ImageBackground
				source={{ uri: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80' }}
				style={styles.backgroundImage}
				resizeMode="cover"
			>
				<LinearGradient
					colors={['rgba(0, 0, 0, 0.3)', 'rgba(0, 0, 0, 0.7)']}
					style={styles.overlay}
				>
				<View style={styles.content}>
					<View style={styles.heroSection}>
						<View style={styles.iconContainer}>
							<Ionicons name="rocket" size={60} color="#FFFFFF" />
						</View>
						
						<Text style={styles.title}>Just It</Text>
						<Text style={styles.subtitle}>
							Organisez vos projets, atteignez vos objectifs et transformez vos idées en réalité.
						</Text>

						<View style={styles.featuresContainer}>
							<View style={styles.feature}>
								<Ionicons name="checkmark-circle" size={24} color="#34C759" />
								<Text style={styles.featureText}>Gestion de projets intuitive</Text>
							</View>
							<View style={styles.feature}>
								<Ionicons name="checkmark-circle" size={24} color="#34C759" />
								<Text style={styles.featureText}>Suivi de progression en temps réel</Text>
							</View>
							<View style={styles.feature}>
								<Ionicons name="checkmark-circle" size={24} color="#34C759" />
								<Text style={styles.featureText}>Collaboration simplifiée</Text>
							</View>
						</View>
					</View>

					<View style={styles.buttonSection}>
						<Link href="/(auth)/onboarding" asChild>
							<TouchableOpacity style={styles.primaryButton}>
								<Text style={styles.primaryButtonText}>Créer un compte</Text>
							</TouchableOpacity>
						</Link>

						<Link href="/(auth)/login" asChild>
							<TouchableOpacity style={styles.secondaryButton}>
								<Text style={styles.secondaryButtonText}>Se connecter</Text>
							</TouchableOpacity>
						</Link>

						<View style={styles.termsContainer}>
							<Text style={styles.termsText}>
							En continuant, vous acceptez nos{' '}
							<Text style={styles.termsLink}>Conditions d'utilisation</Text>
							{' '}et notre{' '}
							<Text style={styles.termsLink}>Politique de confidentialité</Text>
							</Text>
						</View>
					</View>
				</View>
				</LinearGradient>
			</ImageBackground>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	backgroundImage: {
		flex: 1,
		width: '100%',
		height: '100%',
	},
	overlay: {
		flex: 1,
	},
	content: {
		flex: 1,
		paddingHorizontal: 24,
		justifyContent: 'space-between',
		paddingTop: 60,
		paddingBottom: 40,
	},
	heroSection: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	iconContainer: {
		width: 120,
		height: 120,
		borderRadius: 60,
		backgroundColor: 'rgba(255, 255, 255, 0.1)',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 32,
		borderWidth: 2,
		borderColor: 'rgba(255, 255, 255, 0.2)',
	},
	title: {
		fontSize: 32,
		fontWeight: 'bold',
		color: '#FFFFFF',
		textAlign: 'center',
		marginBottom: 16,
	},
	subtitle: {
		fontSize: 18,
		color: '#FFFFFF',
		textAlign: 'center',
		lineHeight: 26,
		marginBottom: 40,
		opacity: 0.9,
	},
	featuresContainer: {
		alignItems: 'flex-start',
	},
	feature: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 12,
	},
	featureText: {
		color: '#FFFFFF',
		fontSize: 16,
		marginLeft: 12,
		opacity: 0.9,
	},
	buttonSection: {
		marginTop: 40,
	},
	primaryButton: {
		backgroundColor: '#007AFF',
		paddingVertical: 16,
		borderRadius: 12,
		marginBottom: 12,
		shadowColor: '#007AFF',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 8,
		elevation: 6,
	},
	primaryButtonText: {
		color: '#FFFFFF',
		fontSize: 18,
		fontWeight: '600',
		textAlign: 'center',
	},
	secondaryButton: {
		backgroundColor: 'rgba(255, 255, 255, 0.1)',
		paddingVertical: 16,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: 'rgba(255, 255, 255, 0.3)',
		marginBottom: 24,
	},
	secondaryButtonText: {
		color: '#FFFFFF',
		fontSize: 18,
		fontWeight: '500',
		textAlign: 'center',
	},
	termsContainer: {
		paddingHorizontal: 8,
	},
	termsText: {
		color: '#FFFFFF',
		fontSize: 14,
		textAlign: 'center',
		lineHeight: 20,
		opacity: 0.8,
	},
	termsLink: {
		textDecorationLine: 'underline',
		fontWeight: '500',
	},
});
