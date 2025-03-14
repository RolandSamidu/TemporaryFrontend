import React from 'react';
import { Stack } from 'expo-router';

// Define the type for the stack navigation
export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="login" options={{ title: 'Login' }} />
      <Stack.Screen name="farmer-dashboard" options={{ title: 'Farmer Dashboard' }} />
      <Stack.Screen name="intermediate-dashboard" options={{ title: 'Intermediate Dashboard' }} />
      <Stack.Screen name="rice-producer-dashboard" options={{ title: 'Rice Producer Dashboard' }} />
      <Stack.Screen name="profile" options={{ title: 'Profile' }} />
      <Stack.Screen name="post" options={{ title: 'Post' }} />
    </Stack>
  );
}