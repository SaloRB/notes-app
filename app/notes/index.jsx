import { useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import AddNoteModal from '@/components/AddNoteModal'
import NoteList from '@/components/NoteList'
import noteService from '@/services/noteService'

const NotesScreen = () => {
  const [notes, setNotes] = useState([])
  const [newNote, setNewNote] = useState('')
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

  // Add New Note
  const addNote = async () => {
    if (newNote.trim() === '') return

    const response = await noteService.addNote(newNote)

    if (response.error) {
      Alert.alert('Error', response.error)
    } else {
      setNotes([...notes, response.data])
    }

    setNewNote('')
    setModalVisible(false)
  }

  // Delete Note
  const deleteNote = async (id) => {
    Alert.alert('Delete Note', 'Are you sure you want to delete this note?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          const response = await noteService.deleteNote(id)
          if (response.error) {
            Alert.alert('Error', response.error)
          } else {
            setNotes(notes.filter((note) => note.$id !== id))
          }
        },
      },
    ])
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#007bff" />
      ) : (
        <>
          {error && <Text style={styles.errorText}>{error}</Text>}
          <NoteList notes={notes} onDelete={deleteNote} />
        </>
      )}

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.addButtonText}>+ Add Note</Text>
      </TouchableOpacity>

      <AddNoteModal
        newNote={newNote}
        setNewNote={setNewNote}
        addNote={addNote}
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
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 16,
  },
})

export default NotesScreen
