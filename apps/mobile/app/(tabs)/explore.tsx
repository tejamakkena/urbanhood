import { useState } from 'react'
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Search, MapPin } from 'lucide-react-native'
import { useLocalSearchParams } from 'expo-router'

const CATEGORIES = [
  { label: 'All', slug: '' },
  { label: 'Chairs', slug: 'CHAIRS' },
  { label: 'Tables', slug: 'TABLES' },
  { label: 'Tents', slug: 'TENTS' },
  { label: 'Linens', slug: 'LINENS' },
  { label: 'Décor', slug: 'DECOR' },
  { label: 'Lighting', slug: 'LIGHTING' },
]

export default function ExploreScreen() {
  const params = useLocalSearchParams<{ category?: string }>()
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState(params.category ?? '')

  return (
    <SafeAreaView style={styles.container}>
      {/* Search header */}
      <View style={styles.header}>
        <Text style={styles.title}>Explore Rentals</Text>
        <View style={styles.searchBar}>
          <Search size={18} color="#71717a" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search items..."
            value={search}
            onChangeText={setSearch}
            placeholderTextColor="#a1a1aa"
          />
        </View>
      </View>

      {/* Category filter */}
      <FlatList
        horizontal
        data={CATEGORIES}
        keyExtractor={(item) => item.slug}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.categoryPill, activeCategory === item.slug && styles.categoryPillActive]}
            onPress={() => setActiveCategory(item.slug)}
          >
            <Text
              style={[
                styles.categoryPillText,
                activeCategory === item.slug && styles.categoryPillTextActive,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* Empty state — real data from API in Phase 2 */}
      <View style={styles.emptyState}>
        <Text style={styles.emptyEmoji}>🔍</Text>
        <Text style={styles.emptyTitle}>Listings coming soon</Text>
        <Text style={styles.emptyDesc}>
          Connect to the API to load live inventory from local suppliers.
        </Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa' },
  header: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 12 },
  title: { fontSize: 22, fontWeight: '700', color: '#18181b', marginBottom: 12 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e4e4e7',
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  searchInput: { flex: 1, fontSize: 14, color: '#18181b' },
  categoryList: { paddingHorizontal: 24, gap: 8, paddingBottom: 16 },
  categoryPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#e4e4e7',
    backgroundColor: '#fff',
  },
  categoryPillActive: { backgroundColor: '#7c3aed', borderColor: '#7c3aed' },
  categoryPillText: { fontSize: 13, fontWeight: '500', color: '#52525b' },
  categoryPillTextActive: { color: '#fff' },
  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 40 },
  emptyEmoji: { fontSize: 48, marginBottom: 16 },
  emptyTitle: { fontSize: 18, fontWeight: '600', color: '#18181b', marginBottom: 8 },
  emptyDesc: { fontSize: 14, color: '#71717a', textAlign: 'center', lineHeight: 20 },
})
