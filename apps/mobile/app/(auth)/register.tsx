import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { ArrowLeft } from 'lucide-react-native'

export default function RegisterScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <ArrowLeft size={20} color="#18181b" />
        </TouchableOpacity>

        <View style={styles.logoRow}>
          <View style={styles.logoBox}>
            <Text style={styles.logoLetter}>U</Text>
          </View>
          <Text style={styles.logoText}>Urbanhood</Text>
        </View>

        <Text style={styles.title}>Create account</Text>
        <Text style={styles.subtitle}>
          Join to rent supplies or list your inventory
        </Text>

        {/* Reuse the same sign-in flow — NextAuth creates new accounts automatically */}
        <TouchableOpacity
          style={styles.googleBtn}
          activeOpacity={0.8}
        >
          <Text style={styles.googleG}>G</Text>
          <Text style={styles.googleText}>Sign up with Google</Text>
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>or</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity
          style={styles.emailBtn}
          onPress={() => router.replace('/(auth)/login')}
          activeOpacity={0.8}
        >
          <Text style={styles.emailBtnText}>Sign up with email</Text>
        </TouchableOpacity>

        <Text style={styles.switchText}>
          Already have an account?{' '}
          <Text style={styles.switchLink} onPress={() => router.replace('/(auth)/login')}>
            Sign in
          </Text>
        </Text>

        <Text style={styles.terms}>
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa' },
  inner: { flex: 1, paddingHorizontal: 24, paddingTop: 16, paddingBottom: 40 },
  backBtn: {
    width: 40, height: 40, borderRadius: 12,
    backgroundColor: '#fff', borderWidth: 1, borderColor: '#e4e4e7',
    alignItems: 'center', justifyContent: 'center', marginBottom: 32,
  },
  logoRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 32 },
  logoBox: {
    width: 36, height: 36, borderRadius: 10, backgroundColor: '#7c3aed',
    alignItems: 'center', justifyContent: 'center',
  },
  logoLetter: { fontSize: 16, fontWeight: '800', color: '#fff' },
  logoText: { fontSize: 18, fontWeight: '700', color: '#18181b' },
  title: { fontSize: 26, fontWeight: '800', color: '#18181b', marginBottom: 6 },
  subtitle: { fontSize: 14, color: '#71717a', marginBottom: 32 },
  googleBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
    backgroundColor: '#fff', borderRadius: 14, borderWidth: 1, borderColor: '#e4e4e7',
    paddingVertical: 14, marginBottom: 16,
  },
  googleG: { fontSize: 16, fontWeight: '700', color: '#4285F4' },
  googleText: { fontSize: 15, fontWeight: '600', color: '#18181b' },
  divider: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 16 },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#e4e4e7' },
  dividerText: { fontSize: 12, color: '#a1a1aa', fontWeight: '500' },
  emailBtn: {
    backgroundColor: '#7c3aed', borderRadius: 14, paddingVertical: 16,
    alignItems: 'center', marginBottom: 24,
  },
  emailBtnText: { fontSize: 15, fontWeight: '700', color: '#fff' },
  switchText: { fontSize: 13, color: '#71717a', textAlign: 'center', marginBottom: 24 },
  switchLink: { color: '#7c3aed', fontWeight: '600' },
  terms: { fontSize: 11, color: '#a1a1aa', textAlign: 'center', lineHeight: 16 },
})
