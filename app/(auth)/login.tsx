import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/contexts/AuthContext';
import { useMutation } from '@tanstack/react-query';
import { LoginUser, postLogin } from '@/services/authQueries';
import api from '@/services/api';
import * as Haptics from 'expo-haptics';

export default function LoginScreen() {
	const { login } = useAuth();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	const { mutate, isPending } = useMutation({
		mutationFn: (userData: LoginUser) => postLogin(userData),
		onSuccess: async (data) => {
			const token = data.access_token;
			await login(token);

			const me = await api.get('/users/me', {
				headers: { Authorization: `Bearer ${token}` }
			});
		},
		onError: (error) => {
			console.log(error);
			alert('Email ou mot de passe incorrect');
		},
	});

	const handleLogin = async () => {
		await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

		if (!email || !password) {
			Alert.alert("Erreur", "Veuillez remplir tous les champs.");
			return;
		}

		mutate({ email, password });
	};

	const handleForgot = async () => {
		Alert.alert('Mot de passe oublié', 'Veuillez contacter le support pour réinitialiser votre mot de passe.');
	};

	return (
		<KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
			<Text style={styles.title}>Connexion</Text>

			<TextInput
				style={styles.input}
				placeholder="Email ou pseudo"
				placeholderTextColor="#8E8E93"
				value={email}
				onChangeText={setEmail}
				autoCapitalize="none"
				keyboardType="email-address"
			/>

			<View style={styles.passwordContainer}>
				<TextInput
					style={styles.input}
					placeholder="Mot de passe"
					placeholderTextColor="#8E8E93"
					value={password}
					onChangeText={setPassword}
					secureTextEntry={!isPasswordVisible}
				/>
				<TouchableOpacity style={styles.icon} onPress={() => setIsPasswordVisible((prev) => !prev)}>
				<Ionicons name={isPasswordVisible ? 'eye-off' : 'eye'} size={24} color="#8E8E93"/>
				</TouchableOpacity>
			</View>

			<TouchableOpacity style={styles.forgotButton} onPress={handleForgot} disabled={isPending}>
				<Text style={styles.forgotText}>Mot de passe oublié ?</Text>
			</TouchableOpacity>
	
			<TouchableOpacity
				style={[styles.button, isPending && styles.buttonDisabled]}
				onPress={handleLogin}
				disabled={isPending}
			>
				<Text style={styles.buttonText}>
					{isPending ? 'Connexion...' : 'Se connecter'}
				</Text>
			</TouchableOpacity>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F2F2F7',
		paddingTop: 50,
		paddingHorizontal: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: '700',
		marginBottom: 24,
		textAlign: 'center',
	},
	input: {
		backgroundColor: '#F9F9F9',
		borderRadius: 12,
		paddingHorizontal: 16,
		paddingVertical: 12,
		fontSize: 16,
		borderWidth: 1,
		borderColor: '#C6C6C8',
		marginBottom: 16,
	},
	passwordContainer: {
		position: 'relative',
		justifyContent: 'center',
	},
	icon: {
		position: 'absolute',
		right: 16,
		top: 12,
	},
	forgotButton: {
		marginTop: -6,
		marginBottom: 40,
	},
	forgotText: {
		color: '#A1A1A6',
		fontSize: 14,
		fontWeight: '500',
	},
	button: {
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
	buttonDisabled: {
		backgroundColor: '#A1A1A6',
		shadowColor: '#A1A1A6',
	},
	buttonText: {
		color: '#FFFFFF',
		fontSize: 18,
		fontWeight: '600',
		textAlign: 'center',
	},
});
