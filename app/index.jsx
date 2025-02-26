import { Text, View, StyleSheet } from 'react-native'

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>HOLA MUNDOOOOO!!</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default HomeScreen
