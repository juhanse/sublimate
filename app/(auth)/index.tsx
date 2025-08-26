import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native';
import { useEvent } from 'expo';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as AppleAuthentication from 'expo-apple-authentication';
import GoogleButton from '@/components/ui/GoogleButton';

export default function AuthentificationScreen() {
	return (
		<View style={styles.container}>
			<ImageBackground
				source={{ uri: 'https://images.pexels.com/photos/8242992/pexels-photo-8242992.jpeg' }}
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

					<Text style={styles.title}>
						Atteignez vos objectifs, en toute simplicité.
					</Text>
				</View>

				<View style={styles.buttonSection}>
					<TouchableOpacity style={styles.email} onPress={() => router.push('/(auth)/login')}>
						<Text style={styles.emailText}>Continue with Email</Text>
					</TouchableOpacity>

					<View style={styles.lineContainer}>
						<View style={styles.line} />
						<View>
							<Text style={styles.lineText}>ou</Text>
						</View>
						<View style={styles.line} />
					</View>

					<AppleAuthentication.AppleAuthenticationButton
						buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
						buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.WHITE_OUTLINE}
						cornerRadius={18}
						style={styles.buttonApple}
						onPress={async () => {
							try {
								const credential = await AppleAuthentication.signInAsync({
									requestedScopes: [
										AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
										AppleAuthentication.AppleAuthenticationScope.EMAIL,
									],
								});

								console.log(credential);
							} catch (e) {
								console.log("Error: " + e);
							}
						}}
					/>

					<GoogleButton onPress={() => console.log("test")} radius={18} />
				</View>

				<View style={styles.termsContainer}>
					<Text style={styles.termsText}>
						En continuant, vous acceptez nos{' '}
						<Text style={styles.termsLink}>Conditions d'utilisation</Text>
						{' '}et notre{' '}
						<Text style={styles.termsLink}>Politique de confidentialité</Text>
					</Text>
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
		fontSize: 22,
		fontFamily: 'Mona',
		color: '#f0f0f0ff',
		textAlign: 'center',
		paddingHorizontal: 24,
		marginBottom: 100,
	},
	buttonSection: {
		marginTop: 40,
	},
	email: {
		backgroundColor: '#007AFF',
		paddingVertical: 16,
		borderRadius: 18,
		marginBottom: 12,
		shadowColor: '#007AFF',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.4,
		shadowRadius: 8,
		elevation: 6,
	},
	emailText: {
		color: '#FFFFFF',
		fontSize: 18,
		fontWeight: '600',
		textAlign: 'center',
	},
	buttonApple: {
		width: '100%',
		height: 56,
		marginVertical: 12,
	},
    lineContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#BABABA'
    },
    lineText: {
        width: 50,
        textAlign: 'center',
        color: '#BABABA',
    },
	termsContainer: {
		marginTop: 20,
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
