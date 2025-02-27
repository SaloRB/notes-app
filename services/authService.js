import { ID } from 'react-native-appwrite'

import { account } from './appwrite'

const authService = {
  // Register a new user
  async register(email, password) {
    try {
      const response = await account.create(ID.unique(), email, password)
      return response
    } catch (error) {
      return {
        error: error.message || 'Registration failed. Please try again.',
      }
    }
  },

  // Login an existing user
  async login(email, password) {
    try {
      const response = await account.createEmailPasswordSession(email, password)
      return response
    } catch (error) {
      return {
        error: error.message || 'Login failed. Please check your credentials.',
      }
    }
  },

  // Get logged in user
  async getUser() {
    try {
      return await account.get()
    } catch {
      return null
    }
  },

  // Logout user
  async logout() {
    try {
      return await account.deleteSession('current')
    } catch (error) {
      return {
        error: error.message || 'Logout failed. Please try again.',
      }
    }
  },
}

export default authService
