import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { Search } from 'lucide-react-native'

const CATEGORIES = [
  { label: 'Chairs', emoji: '🪑', slug: 'CHAIRS' },
  { label: 'Tables', emoji: '🪞', slug: 'TABLES' },
  { label: 'Tents', emoji: '⛺', slug: 'TENTS' },
  { label: 'Linens', emoji: '🛏️', slug: 'LINENS' },
  { label: 'Décor', emoji: '🌸', slug: 'DECOR' },
  { label: 'Lighting', emoji: '💡', slug: 'LIGHTING' },
  { label: 'Tableware', emoji: '🍽️', slug: 'TABLEWARE' },
  { label: 'Inflatables', emoji: '🎈', slug: 'INFLATABLES' },
]

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.hero}>
          <Text style={styles.greeting}>Find rentals for your</Text>
          <Text style={styles.heroTitle}>Next event 🎉</Text>

          {/* Search bar */}
          <TouchableOpacity
            style={styles.searchBar}
            onPress={() => router.push('/(tabs)/explore')}
            activeOpacity={0.8}
          >
            <Search size={18} color="#71717a" />
            <Text style={styles.searchPlaceholder}>Search chairs, tents, décor...</Text>
          </TouchableOpacity>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Browse categories</Text>
          <View style={styles.categoryGrid}>
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat.slug}
                style={styles.categoryCard}
                onPress={() => router.push(`/(tabs)/explore?category=${cat.slug}`)}
                activeOpacity={0.7}
              >
                <Text style={styles.categoryEmoji}>{cat.emoji}</Text>
                <Text style={styles.categoryLabel}>{cat.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* How it works */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How Urbanhood works</Text>
          {[
            { step: '1', title: 'Search & discover', desc: 'Find what you need from local suppliers.' },
            { step: '2', title: 'Book instantly', desc: 'Secure checkout in minutes.' },
            { step: '3', title: 'Enjoy your event', desc: 'Return when you\'re done.' },
          ].map((item) => (
            <View key={item.step} style={styles.stepRow}>
              <View style={styles.stepBadge}>
                <Text style={styles.stepNumber}>{item.step}</Text>
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>{item.title}</Text>
                <Text style={styles.stepDesc}>{item.desc}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const { width } = Dimensions.get('window')
const cardWidth = (width - 48 - 12) / 2

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa' },
  hero: {
    backgroundColor: '#7c3aed',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 32,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  greeting: { fontSize: 14, color: 'rgba(255,255,255,0.7)', marginBottom: 4 },
  heroTitle: { fontSize: 28, fontWeight: '800', color: '#fff', marginBottom: 20 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  searchPlaceholder: { fontSize: 14, color: '#a1a1aa' },
  section: { paddingHorizontal: 24, paddingTop: 28 },
  sectionTitle: { fontSize: 18, fontWeight: '700', color: '#18181b', marginBottom: 16 },
  categoryGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  categoryCard: {
    width: cardWidth,
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#e4e4e7',
    padding: 16,
    alignItems: 'center',
    gap: 8,
  },
  categoryEmoji: { fontSize: 32 },
  categoryLabel: { fontSize: 13, fontWeight: '600', color: '#27272a' },
  stepRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 16, marginBottom: 20 },
  stepBadge: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#7c3aed',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  stepNumber: { fontSize: 16, fontWeight: '700', color: '#fff' },
  stepContent: { flex: 1 },
  stepTitle: { fontSize: 15, fontWeight: '600', color: '#18181b', marginBottom: 2 },
  stepDesc: { fontSize: 13, color: '#71717a', lineHeight: 18 },
})
