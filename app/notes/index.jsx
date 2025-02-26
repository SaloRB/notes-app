import { useEffect, useState } from 'react'
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import AddNoteModal from '@/components/AddNoteModal'
import NoteList from '@/components/NoteList'
import noteService from '@/services/noteService'

const NotesScreen = () => {
  const [notes, setNotes] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchNotes()
  }, [])

  const fetchNotes = async () => {
    setLoading(true)
    const response = await noteService.getNotes()

    if (response.error) {
      setError(response.error)
      Alert.alert('Error', response.error)
    } else {
      setNotes(response.data)
      setError(null)
    }

    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <NoteList notes={notes} />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+ Add Note</Text>
      </TouchableOpacity>

      <AddNoteModal
        setNotes={setNotes}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
})

export default NotesScreen
