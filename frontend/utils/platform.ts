import { Platform } from 'react-native';

export const isWeb = Platform.OS === 'web';
export const isNative = Platform.OS === 'ios' || Platform.OS === 'android';

export function webStyle(style: Record<string, unknown> | undefined) {
  return isWeb ? style : undefined;
}
