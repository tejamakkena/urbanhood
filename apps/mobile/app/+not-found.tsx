import { View, Text, StyleSheet } from 'react-native'
import { Link, Stack } from 'expo-router'

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Not found' }} />
      <View style={styles.container}>
        <Text style={styles.emoji}>🔍</Text>
        <Text style={styles.title}>Page not found</Text>
        <Link href="/" style={styles.link}>
          Go home
        </Link>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  emoji: { fontSize: 48 },
  title: { fontSize: 18, fontWeight: '600', color: '#18181b' },
  link: { fontSize: 15, color: '#7c3aed', fontWeight: '600' },
})
