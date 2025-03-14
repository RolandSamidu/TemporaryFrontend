import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import BottomNav from '../components/BottomNav';

export default function RiceProducerDashboard() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rice Producer Dashboard</Text>
      <Button title="Price" onPress={() => alert('Price page coming soon')} />
      <Button title="Post" onPress={() => router.push('/post')} />
      <BottomNav userType="Rice Producer" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
});
