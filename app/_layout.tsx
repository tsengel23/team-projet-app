import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" backgroundColor="#1B4332" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="qr-scan" />
        <Stack.Screen name="signup" />
        <Stack.Screen name="pending" />
        <Stack.Screen name="otp" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </>
  );
}
