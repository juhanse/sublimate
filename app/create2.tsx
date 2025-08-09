import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Alert,
} from 'react-native';
import Feather from '@expo/vector-icons/Feather';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface Project {
  id: string;
  name: string;
  currentObjective: string;
  color: string;
}

// Mock data
const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Fitness',
    currentObjective: 'Faire 30 pompes d\'affilée',
    color: '#FF6B6B',
  },
  {
    id: '2',
    name: 'Lecture',
    currentObjective: 'Lire 20 pages du livre en cours',
    color: '#4ECDC4',
  },
  {
    id: '3',
    name: 'Cuisine',
    currentObjective: 'Préparer un plat sain maison',
    color: '#45B7D1',
  },
  {
    id: '4',
    name: 'Méditation',
    currentObjective: 'Méditer 15 minutes',
    color: '#96CEB4',
  },
  {
    id: '5',
    name: 'Guitare',
    currentObjective: 'Pratiquer 30 minutes',
    color: '#FFEAA7',
  },
];

export default function CreateScreen() {
  const [selectedProjectIndex, setSelectedProjectIndex] = useState<number>(0);
  const projects = mockProjects;

  const wheelRadius = 120;
  const bubbleSize = 50;

  // Calcul de l'angle pour chaque projet sur un demi-cercle
  const getProjectAngle = (index: number, total: number) => {
    const angleStep = Math.PI / (total + 1);
    return (index + 1) * angleStep;
  };

  // Position des bulles sur la roulette
  const getProjectPosition = (index: number, total: number) => {
    const angle = getProjectAngle(index, total);
    const x = Math.cos(angle) * wheelRadius;
    const y = -Math.sin(angle) * wheelRadius;
    return { x, y };
  };

  const selectedProject = projects[selectedProjectIndex];

  const handleCreateProject = () => {
    Alert.alert(
      "Nouveau Projet",
      "Fonctionnalité de création de projet",
      [{ text: "OK" }]
    );
  };

  const handleTakePhoto = () => {
    if (selectedProject) {
      Alert.alert(
        "Prendre une photo",
        `Valider l'objectif "${selectedProject.currentObjective}" du projet "${selectedProject.name}" ?`,
        [
          { text: "Annuler", style: "cancel" },
          {
            text: "Valider",
            onPress: () => {
              Alert.alert("Succès", "Objectif validé avec succès !");
            }
          }
        ]
      );
    }
  };

  const selectPreviousProject = () => {
    setSelectedProjectIndex(prev => 
      prev === 0 ? projects.length - 1 : prev - 1
    );
  };

  const selectNextProject = () => {
    setSelectedProjectIndex(prev => 
      prev === projects.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Créer ou Valider</Text>
      </View>

      {/* Zone principale */}
      <View style={styles.mainContent}>
        {projects.length > 0 ? (
          <>
            {/* Roulette de projets */}
            <View style={styles.wheelContainer}>
              <View style={styles.wheel}>
                {projects.map((project, index) => {
                  const position = getProjectPosition(index, projects.length);
                  const isSelected = index === selectedProjectIndex;
                  
                  return (
                    <TouchableOpacity
                      key={project.id}
                      style={[
                        styles.projectBubble,
                        {
                          left: screenWidth / 2 + position.x - bubbleSize / 2,
                          top: 120 + position.y - bubbleSize / 2,
                          backgroundColor: project.color,
                          transform: [
                            { scale: isSelected ? 1.3 : 1 }
                          ],
                          elevation: isSelected ? 8 : 3,
                          shadowOpacity: isSelected ? 0.4 : 0.25,
                        }
                      ]}
                      onPress={() => setSelectedProjectIndex(index)}
                    >
                      <Text style={styles.bubbleText}>
                        {project.name.charAt(0).toUpperCase()}
                      </Text>
                      {isSelected && (
                        <View style={styles.selectedIndicator} />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Indicateur central */}
              <View style={styles.centerIndicator}>
				<Feather name="target" size={24} color="#666" />
              </View>

              {/* Boutons de navigation */}
              <View style={styles.navigationButtons}>
                <TouchableOpacity
                  style={styles.navButton}
                  onPress={selectPreviousProject}
                >
                  <Text style={styles.navButtonText}>←</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.navButton}
                  onPress={selectNextProject}
                >
                  <Text style={styles.navButtonText}>→</Text>
                </TouchableOpacity>
              </View>
            </View>

            {/* Objectif sélectionné */}
            {selectedProject && (
              <View style={styles.selectedObjective}>
                <Text style={styles.projectName}>{selectedProject.name}</Text>
                <Text style={styles.objectiveText}>
                  {selectedProject.currentObjective}
                </Text>
                
                <TouchableOpacity
                  style={styles.photoButton}
                  onPress={handleTakePhoto}
                >
					<Feather name="camera" size={28} color="white" />
                  <Text style={styles.photoButtonText}>Prendre Photo</Text>
                </TouchableOpacity>
              </View>
            )}
          </>
        ) : (
          <View style={styles.noProjectsContainer}>
            <Text style={styles.noProjectsText}>
              Aucun projet en cours
            </Text>
            <Text style={styles.noProjectsSubtext}>
              Créez votre premier projet pour commencer
            </Text>
          </View>
        )}
      </View>

      {/* Bouton créer nouveau projet */}
      <TouchableOpacity
        style={styles.createButton}
        onPress={handleCreateProject}
      >
			<Feather name="plus" size={28} color="white" />
        <Text style={styles.createButtonText}>Nouveau Projet</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wheelContainer: {
    width: 300,
    height: 280,
    position: 'relative',
    marginBottom: 40,
  },
  wheel: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  projectBubble: {
    position: 'absolute',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  bubbleText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  selectedIndicator: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: '#007AFF',
    backgroundColor: 'transparent',
  },
  centerIndicator: {
    position: 'absolute',
    top: 140,
    left: '50%',
    transform: [{ translateX: -12 }],
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  navigationButtons: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 40,
  },
  navButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  navButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  selectedObjective: {
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  projectName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  objectiveText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 25,
    lineHeight: 22,
  },
  photoButton: {
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  photoButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
  noProjectsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  noProjectsText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 10,
  },
  noProjectsSubtext: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  createButton: {
    backgroundColor: '#34C759',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  createButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
});
