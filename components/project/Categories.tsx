import React from "react";
import { View, Text, Pressable, ActivityIndicator, StyleSheet, Alert } from "react-native";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import * as Haptics from 'expo-haptics';
import { PosY, PosX } from "@/constants/Responsive";
import { fetchCategories, type Category } from '@/services/categoriesQueries';
import { fetchMeProjectById, updateMeProjectById, type Project } from '@/services/projectsQueries';

interface CategoriesProps {
  projectId: string;
  maxCategories?: number;
}

export default function Categories({ projectId, maxCategories = 2 }: CategoriesProps) {
  const { t } = useTranslation();
  const queryClient = useQueryClient();

  // Récupère toutes les catégories disponibles
  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: () => fetchCategories(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Récupère le projet avec ses catégories
  const projectQuery = useQuery({
    queryKey: ['projectId', projectId],
    queryFn: () => fetchMeProjectById(projectId),
    enabled: !!projectId,
  });

  // Mutation pour mettre à jour les catégories du projet
  const updateCategoriesMutation = useMutation({
    mutationFn: (categoryIds: string[]) => 
      updateMeProjectById(projectId, { categories: categoryIds }),
    onMutate: async (newCategoryIds) => {
      // Annule les requêtes en cours
      await queryClient.cancelQueries({ queryKey: ['projectId', projectId] });
      
      // Sauvegarde l'état précédent pour rollback
      const previousProject = queryClient.getQueryData<Project>(['projectId', projectId]);
      
      // Optimistic update
      queryClient.setQueryData<Project>(['projectId', projectId], (old) => {
        if (!old) return old;
        
        const newProjectsCategories = newCategoryIds.map(catId => {
          const category = categoriesQuery.data?.find(c => c.id === catId);
          return {
            categories: category || {
              id: catId,
              name: '',
              lang: '',
              updated_at: new Date().toISOString(),
              created_at: new Date().toISOString(),
            }
          };
        });
        
        return {
          ...old,
          projects_categories: newProjectsCategories,
        };
      });

      return { previousProject };
    },
    onError: (error, variables, context) => {
      // Rollback en cas d'erreur
      if (context?.previousProject) {
        queryClient.setQueryData(['projectId', projectId], context.previousProject);
      }
      console.error('Error updating categories:', error);
    },
    onSettled: () => {
      // Invalide les queries pour être sûr d'avoir les données à jour
      queryClient.invalidateQueries({ queryKey: ['projectId', projectId] });
      queryClient.invalidateQueries({ queryKey: ['projects', 'active'] });
    },
  });

  const handleCategoryPress = async (categoryId: string) => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    const currentCategoryIds = projectQuery.data?.projects_categories.map(
      pc => pc.categories.id
    ) ?? [];
    
    const isSelected = currentCategoryIds.includes(categoryId);
    
    // Si la catégorie n'est pas sélectionnée et qu'on a atteint la limite
    if (!isSelected && currentCategoryIds.length >= maxCategories) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      Alert.alert(
        t('categories.limitTitle'),
        t('categories.limitMessage', { max: maxCategories }),
        [{ text: 'OK' }]
      );
      return;
    }
    
    // Ajoute ou retire la catégorie
    const newCategoryIds = isSelected
      ? currentCategoryIds.filter(id => id !== categoryId)
      : [...currentCategoryIds, categoryId];
    
    updateCategoriesMutation.mutate(newCategoryIds);
  };

  const isCategorySelected = (categoryId: string): boolean => {
    return projectQuery.data?.projects_categories.some(
      pc => pc.categories.id === categoryId
    ) ?? false;
  };

  const isMaxCategoriesReached = (): boolean => {
    const currentCount = projectQuery.data?.projects_categories.length ?? 0;
    return currentCount >= maxCategories;
  };

  if (categoriesQuery.isLoading || projectQuery.isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color="white" size="small" />
      </View>
    );
  }

  if (categoriesQuery.isError || projectQuery.isError) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{t('categories.error')}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {categoriesQuery.data?.map((category) => {
        const isSelected = isCategorySelected(category.id);
        const isUpdating = updateCategoriesMutation.isPending;
        const isMaxReached = isMaxCategoriesReached();
        const isDisabled = isUpdating || (!isSelected && isMaxReached);
        
        return (
          <Pressable
            key={category.id}
            style={[
              styles.tag,
              { backgroundColor: isSelected ? "#000000" : "#D9D9D9" },
              isDisabled && styles.tagDisabled,
            ]}
            onPress={() => handleCategoryPress(category.id)}
            disabled={isDisabled}
          >
            <Text
              style={[
                styles.tagText,
                { color: isSelected ? "#FFFFFF" : "#000000" },
              ]}
            >
              {t(`categories.${category.name}`)}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: PosY(5),
  },
  loadingContainer: {
    padding: PosY(20),
    alignItems: 'center',
  },
  tag: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
    paddingHorizontal: PosX(20),
    paddingVertical: PosY(10),
    gap: PosX(5),
    borderRadius: PosX(30),
  },
  tagDisabled: {
    opacity: 0.4,
  },
  tagText: {
    fontFamily: "SF-Medium",
    fontSize: PosY(16),
  },
  errorText: {
    color: "#FF6B6B",
    fontSize: PosX(14),
    fontFamily: "SF-Medium",
  },
});
