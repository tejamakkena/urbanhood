import { View, Text, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { Button } from '../src/components/ui/Button'
import { CalendarDays } from 'lucide-react-native'

export default function BookingsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Bookings</Text>
      </View>

      <View style={styles.emptyState}>
        <CalendarDays size={48} color="#a78bfa" />
        <Text style={styles.emptyTitle}>No bookings yet</Text>
        <Text style={styles.emptyDesc}>
          Browse rentals and book items for your next event.
        </Text>
        <Button
          label="Browse rentals"
          onPress={() => router.push('/(tabs)/explore')}
          style={styles.cta}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa' },
  header: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 12 },
  title: { fontSize: 22, fontWeight: '700', color: '#18181b' },
  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 40, gap: 12 },
  emptyTitle: { fontSize: 18, fontWeight: '600', color: '#18181b' },
  emptyDesc: { fontSize: 14, color: '#71717a', textAlign: 'center', lineHeight: 20 },
  cta: { marginTop: 8 },
})
