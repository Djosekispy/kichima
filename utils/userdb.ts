import { LoginResponse } from '@/constants/globalTypes';
import * as SecureStore from 'expo-secure-store';

const STORAGE_KEY = 'user';

export async function saveUserData(userData: LoginResponse ): Promise<void> {
  try {
    
    const data = JSON.stringify(userData);
    await SecureStore.setItemAsync(STORAGE_KEY, data);
  } catch (error) {
    console.error('Error saving user data:', error);
    throw error;
  }
}

export async function getUserData(): Promise<LoginResponse | null> {
  try {
    const data = await SecureStore.getItemAsync(STORAGE_KEY);
    if (data) {
      return JSON.parse(data);
    }
    return null;
  } catch (error) {
    console.error('Error getting user data:', error);
    throw error;
  }
}

export async function updateUserData(userData: LoginResponse ): Promise<void> {
  try {
    const existingData = await getUserData();
    if (existingData) {
      const updatedData = { ...existingData, ...userData };
      await saveUserData(updatedData)
    } else {
      throw new Error('User data not found');
    }
  } catch (error) {
    console.error('Error updating user data:', error);
    throw error;
  }
}

export async function deleteUserData(): Promise<void> {
  try {
    await SecureStore.deleteItemAsync(STORAGE_KEY);
  } catch (error) {
    console.error('Error deleting user data:', error);
    throw error;
  }
}
