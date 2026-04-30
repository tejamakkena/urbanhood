import { TouchableOpacity, Text, ActivityIndicator, StyleSheet, type ViewStyle } from 'react-native'

interface ButtonProps {
  label: string
  onPress: () => void
  variant?: 'primary' | 'secondary' | 'ghost'
  loading?: boolean
  disabled?: boolean
  style?: ViewStyle
}

export function Button({
  label,
  onPress,
  variant = 'primary',
  loading,
  disabled,
  style,
}: ButtonProps) {
  const isDisabled = disabled || loading

  return (
    <TouchableOpacity
      style={[styles.base, styles[variant], isDisabled && styles.disabled, style]}
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
    >
      {loading && <ActivityIndicator size="small" color={variant === 'primary' ? '#fff' : '#7c3aed'} />}
      <Text style={[styles.text, styles[`${variant}Text` as keyof typeof styles] as object]}>{label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  primary: { backgroundColor: '#7c3aed' },
  secondary: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ddd6fe' },
  ghost: { backgroundColor: 'transparent' },
  disabled: { opacity: 0.5 },
  text: { fontSize: 15, fontWeight: '600' },
  primaryText: { color: '#fff' },
  secondaryText: { color: '#7c3aed' },
  ghostText: { color: '#7c3aed' },
})
