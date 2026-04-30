import { PlatformPressable } from '@react-navigation/elements'
import * as Haptics from 'expo-haptics'

export function HapticTab(props: React.ComponentProps<typeof PlatformPressable>) {
  return (
    <PlatformPressable
      {...props}
      onPressIn={(ev) => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
        props.onPressIn?.(ev)
      }}
    />
  )
}
