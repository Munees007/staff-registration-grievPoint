import {ref, get } from "firebase/database";
import { db } from "../firebase";

export const getDepartments = async () => {
  try {
    const departmentsRef = ref(db, 'departments'); // Adjust this path to your actual Realtime Database structure
    const snapshot = await get(departmentsRef);

    if (snapshot.exists()) {
      return snapshot.val(); // Returns departments data
    } else {
      console.log('No departments data available');
      return null;
    }
  } catch (error) {
    console.error('Error fetching departments:', error);
    throw error;
  }
};
