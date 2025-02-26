import { ID } from 'react-native-appwrite'

import databaseService from './databaseService'

// Appwrite database and collection id
const dbId = process.env.EXPO_PUBLIC_APPWRITE_DB_ID
const colId = process.env.EXPO_PUBLIC_APPWRITE_NOTES_COL_ID

const noteService = {
  // Get Notes
  async getNotes() {
    const response = await databaseService.listDoucments(dbId, colId)
    if (response.error) {
      return { error: response.error }
    }

    return { data: response }
  },
}

export default noteService
