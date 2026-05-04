import { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { router } from 'expo-router'
import { ArrowLeft, Mail } from 'lucide-react-native'

export default function LoginScreen() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  async function handleEmailSignIn() {
    if (!email) return
    setLoading(true)
    // Phase 2: call API to send magic link via NextAuth email provider
    await new Promise((r) => setTimeout(r, 1000))
    setLoading(false)
    setSent(true)
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
          {/* Back */}
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <ArrowLeft size={20} color="#18181b" />
          </TouchableOpacity>

          {/* Logo */}
          <View style={styles.logoRow}>
            <View style={styles.logoBox}>
              <Text style={styles.logoLetter}>U</Text>
            </View>
            <Text style={styles.logoText}>Urbanhood</Text>
          </View>

          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>Sign in to your account</Text>

          {sent ? (
            <View style={styles.sentCard}>
              <Mail size={32} color="#7c3aed" />
              <Text style={styles.sentTitle}>Check your email</Text>
              <Text style={styles.sentDesc}>
                We sent a sign-in link to{'\n'}
                <Text style={styles.sentEmail}>{email}</Text>
              </Text>
            </View>
          ) : (
            <View style={styles.form}>
              {/* Google placeholder */}
              <TouchableOpacity style={styles.googleBtn} activeOpacity={0.8}>
                <Text style={styles.googleG}>G</Text>
                <Text style={styles.googleText}>Continue with Google</Text>
              </TouchableOpacity>

              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>or</Text>
                <View style={styles.dividerLine} />
              </View>

              <View style={styles.field}>
                <Text style={styles.label}>Email address</Text>
                <View style={styles.inputRow}>
                  <Mail size={16} color="#a1a1aa" />
                  <TextInput
                    style={styles.input}
                    placeholder="you@example.com"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                    placeholderTextColor="#a1a1aa"
                  />
                </View>
              </View>

              <TouchableOpacity
                style={[styles.submitBtn, (!email || loading) && styles.submitBtnDisabled]}
                onPress={handleEmailSignIn}
                disabled={!email || loading}
                activeOpacity={0.8}
              >
                <Text style={styles.submitBtnText}>
                  {loading ? 'Sending...' : 'Continue with email'}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <Text style={styles.switchText}>
            {"Don't have an account?"}{' '}
            <Text style={styles.switchLink} onPress={() => router.replace('/(auth)/register')}>
              Sign up
            </Text>
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa' },
  scroll: { flexGrow: 1, paddingHorizontal: 24, paddingTop: 16, paddingBottom: 40 },
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
  form: { gap: 16 },
  googleBtn: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10,
    backgroundColor: '#fff', borderRadius: 14, borderWidth: 1, borderColor: '#e4e4e7',
    paddingVertical: 14,
  },
  googleG: { fontSize: 16, fontWeight: '700', color: '#4285F4' },
  googleText: { fontSize: 15, fontWeight: '600', color: '#18181b' },
  divider: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#e4e4e7' },
  dividerText: { fontSize: 12, color: '#a1a1aa', fontWeight: '500' },
  field: { gap: 6 },
  label: { fontSize: 13, fontWeight: '600', color: '#3f3f46' },
  inputRow: {
    flexDirection: 'row', alignItems: 'center', gap: 10,
    backgroundColor: '#fff', borderRadius: 12, borderWidth: 1, borderColor: '#d4d4d8',
    paddingHorizontal: 14, paddingVertical: 13,
  },
  input: { flex: 1, fontSize: 14, color: '#18181b' },
  submitBtn: {
    backgroundColor: '#7c3aed', borderRadius: 14, paddingVertical: 16,
    alignItems: 'center',
  },
  submitBtnDisabled: { opacity: 0.5 },
  submitBtnText: { fontSize: 15, fontWeight: '700', color: '#fff' },
  sentCard: {
    alignItems: 'center', gap: 12, backgroundColor: '#fff',
    borderRadius: 20, borderWidth: 1, borderColor: '#e4e4e7',
    padding: 32, marginVertical: 24,
  },
  sentTitle: { fontSize: 18, fontWeight: '700', color: '#18181b' },
  sentDesc: { fontSize: 14, color: '#71717a', textAlign: 'center', lineHeight: 20 },
  sentEmail: { fontWeight: '600', color: '#18181b' },
  switchText: { fontSize: 13, color: '#71717a', textAlign: 'center', marginTop: 32 },
  switchLink: { color: '#7c3aed', fontWeight: '600' },
})
