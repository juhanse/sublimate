import { useState } from 'react';
import { View, Text, Button, Pressable, TouchableOpacity, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { PosX } from '@/constants/Responsive';
import * as Haptics from 'expo-haptics';

export default function CameraScreen() {
	const [facing, setFacing] = useState<CameraType>('back');
	const [permission, requestPermission] = useCameraPermissions();

	if (!permission) {
		return <View />;
	}

	if (!permission.granted) {
		return (
			<View style={styles.container}>
				<Text style={styles.message}>We need your permission to show the camera</Text>
				<Button onPress={requestPermission} title="grant permission" />
			</View>
		);
	}

	function toggleCameraFacing() {
		setFacing(current => (current === 'back' ? 'front' : 'back'));
	}

	const takePhoto = async () => {
		await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
		console.log('Take photo pressed');
	}

	const handleBack = async () => {
		await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
		router.back();
	};

	return (
		<View style={styles.container}>
			<CameraView style={styles.camera} facing={facing} />

			<Pressable style={styles.back} onPress={handleBack}>
				<Entypo name="chevron-left" size={PosX(30)} color="#D9D9D9" />
			</Pressable>

			<View style={styles.controlsContainer} pointerEvents="box-none">
				<View style={styles.controlsInner}>
					<TouchableOpacity style={styles.flipButton} onPress={toggleCameraFacing}>
						<MaterialIcons name="flip-camera-ios" size={PosX(28)} color="white" />
					</TouchableOpacity>
					<TouchableOpacity style={styles.shutterOuter} onPress={takePhoto} activeOpacity={0.8}>
						<View style={styles.shutterInner} />
					</TouchableOpacity>
					<TouchableOpacity style={styles.flipButton} onPress={toggleCameraFacing}>
						<MaterialIcons name="flip-camera-ios" size={PosX(28)} color="white" />
					</TouchableOpacity>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	},
	back: {
		position: 'absolute',
		top: PosX(70),
		left: PosX(50),
		zIndex: 10,
	},
	message: {
		textAlign: 'center',
		paddingBottom: 10,
	},
	camera: {
		flex: 1,
	},
	buttonContainer: {
		position: 'absolute',
		bottom: 64,
		flexDirection: 'row',
		backgroundColor: 'transparent',
		width: '100%',
		paddingHorizontal: 64,
	},
	button: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: "red"
	},
	text: {
		fontSize: 24,
		fontWeight: 'bold',
		color: 'white',
	},
	controlsContainer: {
		position: 'absolute',
		bottom: PosX(40),
		width: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'transparent',
	},
	controlsInner: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		gap: PosX(20),
	},
	shutterOuter: {
		width: PosX(96),
		height: PosX(96),
		borderRadius: PosX(96),
		borderWidth: PosX(4),
		borderColor: 'white',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'transparent',
	},
	shutterInner: {
		width: PosX(64),
		height: PosX(64),
		borderRadius: PosX(64),
		backgroundColor: 'white',
	},
	flipButton: {
		marginLeft: PosX(16),
		padding: PosX(10),
		borderRadius: PosX(28),
		backgroundColor: 'transparent',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
