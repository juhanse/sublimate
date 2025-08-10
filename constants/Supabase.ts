import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
	process.env.EXPO_PUBLIC_SUPABASE_URL || "",
	process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "",
	{
		auth: {
			storage: AsyncStorage,
			autoRefreshToken: true,
			persistSession: true,
			detectSessionInUrl: false,
		},
  	}
)

export const signUpWithEmail = async (email: string, password: string, userData: any) => {
	const { data, error } = await supabase.auth.signUp({
		email,
		password,
		options: {
			data: userData
		}
	})
	
	if (error) throw error
	return data
}

export const signInWithEmail = async (email: string, password: string) => {
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password
	})
	
	if (error) throw error
	return data
}

export const signInWithOAuth = async (provider: 'google' | 'apple') => {
	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: provider,
		options: {
			redirectTo: '/',
		}
	})

	if (error) throw error
	return data
}

export const signOut = async () => {
	const { error } = await supabase.auth.signOut()
	if (error) throw error
}

export const getCurrentUser = async () => {
	const { data, error } = await supabase.auth.getUser()
	if (error) throw error
	return data.user
}

export const getCurrentSession = async () => {
	const { data, error } = await supabase.auth.getSession()
	if (error) throw error
	return data.session
}
