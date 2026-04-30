import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { LogIn, Settings, HelpCircle, FileText } from 'lucide-react-native'

const MENU_ITEMS = [
  { icon: Settings, label: 'Account settings', onPress: () => {} },
  { icon: HelpCircle, label: 'Help & support', onPress: () => {} },
  { icon: FileText, label: 'Terms & Privacy', onPress: () => {} },
]

export default function ProfileScreen() {
  // Not logged in state — auth integration Phase 2
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Profile</Text>
      </View>

      {/* Unauthenticated CTA */}
      <View style={styles.authCard}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>?</Text>
        </View>
        <Text style={styles.authTitle}>Sign in to Urbanhood</Text>
        <Text style={styles.authDesc}>
          Book rentals, track orders, and manage your listings.
        </Text>
        <TouchableOpacity
          style={styles.signInBtn}
          onPress={() => router.push('/(auth)/login')}
          activeOpacity={0.8}
        >
          <LogIn size={18} color="#fff" />
          <Text style={styles.signInBtnText}>Sign in</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(auth)/register')}>
          <Text style={styles.registerLink}>Create an account</Text>
        </TouchableOpacity>
      </View>

      {/* Menu */}
      <View style={styles.menu}>
        {MENU_ITEMS.map((item) => (
          <TouchableOpacity
            key={item.label}
            style={styles.menuItem}
            onPress={item.onPress}
            activeOpacity={0.7}
          >
            <item.icon size={20} color="#52525b" />
            <Text style={styles.menuLabel}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa' },
  header: { paddingHorizontal: 24, paddingTop: 16, paddingBottom: 12 },
  title: { fontSize: 22, fontWeight: '700', color: '#18181b' },
  authCard: {
    margin: 24,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e4e4e7',
    padding: 24,
    alignItems: 'center',
    gap: 8,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#ede9fe',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  avatarText: { fontSize: 28, color: '#7c3aed' },
  authTitle: { fontSize: 18, fontWeight: '700', color: '#18181b' },
  authDesc: { fontSize: 13, color: '#71717a', textAlign: 'center', lineHeight: 18 },
  signInBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#7c3aed',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
    marginTop: 8,
  },
  signInBtnText: { fontSize: 15, fontWeight: '600', color: '#fff' },
  registerLink: { fontSize: 13, color: '#7c3aed', fontWeight: '500', marginTop: 4 },
  menu: { paddingHorizontal: 24 },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e4e4e7',
    padding: 16,
    marginBottom: 8,
  },
  menuLabel: { fontSize: 15, fontWeight: '500', color: '#18181b' },
})
