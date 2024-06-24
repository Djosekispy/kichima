
import * as SecureStore from 'expo-secure-store';

const STORAGE_KEY = 'notify';

export interface INotify{
    title:string;
    body:string;
    time:string
}
let existingNotifications: INotify[] = []

function reorganize(data: INotify[]): INotify[] {
  const newData = [];
  for (let i = data.length - 1; i >= 0; i--) {
    newData.push(data[i]);
  }
  return newData;
}


export async function saveNotify(notify: INotify): Promise<void> {
  try {
      const ExistData  = await getNotify();
    if (ExistData?.length > 0) {
      existingNotifications = ExistData;
      existingNotifications.push(notify); 
    } else {
      existingNotifications.push(notify); 
    }
    const updatedData = JSON.stringify(existingNotifications);

    await SecureStore.setItemAsync(STORAGE_KEY, updatedData);
  } catch (error) {
    console.error('Error saving notifications:', error);
    throw error;
  }
}


export async function getNotify(): Promise<INotify[] | null> {
    try {
      const data = await SecureStore.getItemAsync(STORAGE_KEY);
      if (data) {
        const notifications = JSON.parse(data) as INotify[]; 
        const reoganizeNotifications = reorganize(notifications)
        return reoganizeNotifications;
      }
      return null;
    } catch (error) {
      console.error('Error getting notifications:', error);
      throw new Error('Failed to get notifications');
    }
  }
  

export async function deleteNotify(): Promise<void> {
  try {
    await SecureStore.deleteItemAsync(STORAGE_KEY);
  } catch (error) {
    console.error('Error deleting user data:', error);
    throw error;
  }
}
