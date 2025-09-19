import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Alert, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';

interface UserInfo {
	pseudo: string;
	email: string;
}

interface HeaderProps {
	onBackPress: () => void;
}

interface SettingItemProps {
	icon: keyof typeof Ionicons.glyphMap;
	title: string;
	subtitle?: string;
	onPress: () => void;
	isEditing?: boolean;
	value?: string;
	onChangeText?: (text: string) => void;
	onSave?: () => void;
	onCancel?: () => void;
	showArrow?: boolean;
	isDestructive?: boolean;
}

interface SectionProps {
	title: string;
	children: React.ReactNode;
}

interface DeleteModalProps {
	visible: boolean;
	onCancel: () => void;
	onConfirm: () => void;
}

const Header: React.FC<HeaderProps> = ({ onBackPress }) => (
	<View style={styles.header}>
		<TouchableOpacity style={styles.backButton} onPress={onBackPress}>
			<Ionicons name="arrow-back" size={24} color="white" />
		</TouchableOpacity>
		<Text style={styles.headerTitle}>Paramètres</Text>
		<View style={styles.placeholder} />
	</View>
);

const SettingItem: React.FC<SettingItemProps> = ({
  icon,
  title,
  subtitle,
  onPress,
  isEditing = false,
  value = '',
  onChangeText,
  onSave,
  onCancel,
  showArrow = true,
  isDestructive = false,
}) => (
	<TouchableOpacity
		style={[styles.settingItem, isDestructive && styles.destructiveItem]}
		onPress={onPress}
		disabled={isEditing}
	>
    	<View style={styles.settingContent}>
      		<View style={[styles.iconContainer, isDestructive && styles.destructiveIcon]}>
        		<Ionicons name={icon} size={22} color={isDestructive ? '#FF3B30' : '#007AFF'} />
      		</View>
      		<View style={styles.settingText}>
				<Text style={[styles.settingTitle, isDestructive && styles.destructiveText]}>
					{title}
				</Text>
				{isEditing ? (
				<View style={styles.editContainer}>
					<TextInput
						style={styles.editInput}
						value={value}
						onChangeText={onChangeText}
						autoFocus
						selectTextOnFocus
					/>
					<View style={styles.editButtons}>
						<TouchableOpacity onPress={onCancel} style={styles.cancelButton}>
							<Ionicons name="close" size={18} color="#FF3B30" />
						</TouchableOpacity>
						<TouchableOpacity onPress={onSave} style={styles.saveButton}>
							<Ionicons name="checkmark" size={18} color="#34C759" />
						</TouchableOpacity>
					</View>
				</View>
				) : (
				subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>
				)}
			</View>
    	</View>
    {showArrow && !isEditing && (
      	<Ionicons name="chevron-forward" size={18} color="#C7C7CC" />
    )}
  	</TouchableOpacity>
);

const Section: React.FC<SectionProps> = ({ title, children }) => (
	<View style={styles.section}>
		<Text style={styles.sectionTitle}>{title}</Text>
		<View style={styles.sectionContent}>{children}</View>
	</View>
);

const Separator: React.FC = () => <View style={styles.separator} />;

const DeleteModal: React.FC<DeleteModalProps> = ({ visible, onCancel, onConfirm }) => (
	<Modal visible={visible} transparent={true} animationType="fade">
		<View style={styles.modalOverlay}>
			<View style={styles.modalContent}>
				<View style={styles.modalHeader}>
					<Ionicons name="warning" size={48} color="#FF3B30" />
					<Text style={styles.modalTitle}>Supprimer le compte</Text>
					<Text style={styles.modalDescription}>
						Cette action est irréversible. Toutes vos données seront définitivement supprimées.
					</Text>
				</View>
				
				<View style={styles.modalButtons}>
					<TouchableOpacity style={styles.modalCancelButton} onPress={onCancel}>
						<Text style={styles.modalCancelText}>Annuler</Text>
					</TouchableOpacity>
					
					<TouchableOpacity style={styles.modalDeleteButton} onPress={onConfirm}>
						<Text style={styles.modalDeleteText}>Supprimer</Text>
					</TouchableOpacity>
				</View>
			</View>
		</View>
	</Modal>
);

const Settings: React.FC = () => {
	const { logout } = useAuth();
	const [userInfo, setUserInfo] = useState<UserInfo>({
		pseudo: 'JohnDoe',
		email: 'john.doe@example.com',
	});

	const [isEditingPseudo, setIsEditingPseudo] = useState<boolean>(false);
	const [isEditingEmail, setIsEditingEmail] = useState<boolean>(false);
	const [tempPseudo, setTempPseudo] = useState<string>(userInfo.pseudo);
	const [tempEmail, setTempEmail] = useState<string>(userInfo.email);
	const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

	const handleSavePseudo = (): void => {
		setUserInfo({ ...userInfo, pseudo: tempPseudo });
		setIsEditingPseudo(false);
	};

	const handleSaveEmail = (): void => {
		setUserInfo({ ...userInfo, email: tempEmail });
		setIsEditingEmail(false);
	};

	const handleResetPassword = (): void => {
		Alert.alert(
			'Réinitialiser le mot de passe',
			'Un email de réinitialisation sera envoyé à votre adresse email.',
			[
				{ text: 'Annuler', style: 'cancel' },
				{ 
					text: 'Envoyer', 
					onPress: () => {
						Alert.alert('Email envoyé', 'Vérifiez votre boîte email.');
					}
				}
			]
		);
	};

	const handleDeleteAccount = (): void => {
		setShowDeleteModal(false);
		Alert.alert(
			'Compte supprimé',
			'Votre compte a été supprimé avec succès.',
			[{ text: 'OK', onPress: () => router.replace('/(auth)/login') }]
		);
	};

	const handleLogout = (): void => {
		Alert.alert(
			'Déconnexion',
			'Êtes-vous sûr de vouloir vous déconnecter ?',
			[
				{ text: 'Annuler', style: 'cancel' },
				{ 
					text: 'Se déconnecter', 
					style: 'destructive',
					onPress: () => logout()
				}
			]
		);
	};

 	return (
    	<SafeAreaView style={styles.container}>
      		<Header onBackPress={() => router.back()} />
      		<ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        		<Section title="PROFIL">
          			<SettingItem
						icon="person-outline"
						title="Pseudo"
						subtitle={!isEditingPseudo ? userInfo.pseudo : undefined}
						onPress={() => setIsEditingPseudo(true)}
						isEditing={isEditingPseudo}
						value={tempPseudo}
						onChangeText={setTempPseudo}
						onSave={handleSavePseudo}
						onCancel={() => {
						setTempPseudo(userInfo.pseudo);
						setIsEditingPseudo(false);
						}}
						showArrow={!isEditingPseudo}
					/>
          			<Separator />
					<SettingItem
						icon="mail-outline"
						title="Email"
						subtitle={!isEditingEmail ? userInfo.email : undefined}
						onPress={() => setIsEditingEmail(true)}
						isEditing={isEditingEmail}
						value={tempEmail}
						onChangeText={setTempEmail}
						onSave={handleSaveEmail}
						onCancel={() => {
							setTempEmail(userInfo.email);
							setIsEditingEmail(false);
						}}
						showArrow={!isEditingEmail}
					/>
				</Section>

        		<Section title="SÉCURITÉ">
					<SettingItem
						icon="key-outline"
						title="Réinitialiser le mot de passe"
						subtitle="Recevoir un email de réinitialisation"
						onPress={handleResetPassword}
					/>
        		</Section>

        		<Section title="NOTIFICATIONS">
					<SettingItem
						icon="notifications-outline"
						title="Notifications push"
						subtitle="Gérer vos préférences"
						onPress={() => Alert.alert('Notifications', 'Fonctionnalité en cours de développement')}
					/>
				</Section>

				<Section title="AIDE">
					<SettingItem
						icon="help-circle-outline"
						title="Centre d'aide"
						subtitle="FAQ et support"
						onPress={() => Alert.alert('Aide', 'Fonctionnalité en cours de développement')}
					/>
					<Separator />
					<SettingItem
						icon="information-circle-outline"
						title="À propos"
						subtitle="Version 1.0.0"
						onPress={() => Alert.alert('À propos', 'Application développée avec React Native Expo')}
					/>
				</Section>
				
				<Section title="">
					<SettingItem
						icon="log-out-outline"
						title="Se déconnecter"
						onPress={handleLogout}
						showArrow={false}
					/>
					<Separator />
					<SettingItem
						icon="trash-outline"
						title="Supprimer le compte"
						onPress={() => setShowDeleteModal(true)}
						showArrow={false}
						isDestructive={true}
					/>
				</Section>
				<View style={styles.bottomSpacing} />
			</ScrollView>
			<DeleteModal
				visible={showDeleteModal}
				onCancel={() => setShowDeleteModal(false)}
				onConfirm={handleDeleteAccount}
			/>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#F2F2F7',
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 16,
		paddingVertical: 12,
		paddingTop: 16,
	},
	backButton: {
		padding: 8,
	},
	headerTitle: {
		fontSize: 18,
		fontWeight: '600',
		color: 'white',
	},
	placeholder: {
		width: 40,
	},
	content: {
		flex: 1,
	},
	section: {
		marginTop: 32,
	},
	sectionTitle: {
		fontSize: 13,
		fontWeight: '600',
		color: '#8E8E93',
		marginLeft: 16,
		marginBottom: 8,
		letterSpacing: 0.5,
	},
	sectionContent: {
		backgroundColor: 'white',
		marginHorizontal: 16,
		borderRadius: 12,
		shadowColor: '#000',
		shadowOffset: {
		width: 0,
		height: 1,
		},
		shadowOpacity: 0.05,
		shadowRadius: 2,
		elevation: 1,
	},
	settingItem: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingHorizontal: 16,
		paddingVertical: 12,
	},
	destructiveItem: {},
	settingContent: {
		flexDirection: 'row',
		alignItems: 'center',
		flex: 1,
	},
	iconContainer: {
		width: 32,
		height: 32,
		borderRadius: 8,
		backgroundColor: '#E3F2FD',
		alignItems: 'center',
		justifyContent: 'center',
		marginRight: 12,
	},
	destructiveIcon: {
		backgroundColor: '#FFEBEE',
	},
	settingText: {
		flex: 1,
	},
	settingTitle: {
		fontSize: 16,
		fontWeight: '500',
		color: '#000',
		marginBottom: 2,
	},
	destructiveText: {
		color: '#FF3B30',
	},
	settingSubtitle: {
		fontSize: 14,
		color: '#8E8E93',
	},
	editContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 4,
	},
	editInput: {
		flex: 1,
		fontSize: 16,
		paddingVertical: 8,
		paddingHorizontal: 12,
		backgroundColor: '#F2F2F7',
		borderRadius: 8,
		marginRight: 8,
	},
	editButtons: {
		flexDirection: 'row',
		gap: 8,
	},
	cancelButton: {
		padding: 8,
		borderRadius: 6,
		backgroundColor: '#FFEBEE',
	},
	saveButton: {
		padding: 8,
		borderRadius: 6,
		backgroundColor: '#E8F5E8',
	},
	separator: {
		height: 1,
		backgroundColor: '#F2F2F7',
		marginLeft: 60,
	},
	bottomSpacing: {
		height: 32,
	},
	modalOverlay: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 32,
	},
	modalContent: {
		backgroundColor: 'white',
		borderRadius: 16,
		padding: 24,
		width: '100%',
		maxWidth: 320,
	},
	modalHeader: {
		alignItems: 'center',
		marginBottom: 24,
	},
	modalTitle: {
		fontSize: 18,
		fontWeight: '600',
		color: '#000',
		marginTop: 16,
		marginBottom: 8,
	},
	modalDescription: {
		fontSize: 14,
		color: '#8E8E93',
		textAlign: 'center',
		lineHeight: 20,
	},
	modalButtons: {
		flexDirection: 'row',
		gap: 12,
	},
	modalCancelButton: {
		flex: 1,
		paddingVertical: 12,
		paddingHorizontal: 24,
		borderRadius: 8,
		backgroundColor: '#F2F2F7',
		alignItems: 'center',
	},
	modalDeleteButton: {
		flex: 1,
		paddingVertical: 12,
		paddingHorizontal: 24,
		borderRadius: 8,
		backgroundColor: '#FF3B30',
		alignItems: 'center',
	},
	modalCancelText: {
		fontSize: 16,
		fontWeight: '500',
		color: '#000',
	},
	modalDeleteText: {
		fontSize: 16,
		fontWeight: '500',
		color: 'white',
	},
});

export default Settings;
