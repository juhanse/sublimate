import 'react-native-url-polyfill/auto'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as SecureStore from 'expo-secure-store';
import { createClient, Session } from '@supabase/supabase-js'

export const supabase = createClient(
	process.env.EXPO_PUBLIC_SUPABASE_URL!,
	process.env.EXPO_PUBLIC_SUPABASE_KEY!,
	{
		auth: {
			storage: AsyncStorage,
			autoRefreshToken: true,
			persistSession: true,
			detectSessionInUrl: false,
		},
  	}
)

supabase.auth.onAuthStateChange((_event, session: Session | null) => {
	if (session?.access_token) {
		SecureStore.setItemAsync('access_token', session.access_token);
	} else {
		SecureStore.deleteItemAsync('access_token');
	}
});

export const signInWithEmail = async (email: string, password: string) => {
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) throw error;

	if (data.session?.access_token) {
		await SecureStore.setItemAsync('access_token', data.session.access_token);
	}

	return data;
};

export const signOut = async () => {
	await supabase.auth.signOut();
	await SecureStore.deleteItemAsync('access_token');
};
