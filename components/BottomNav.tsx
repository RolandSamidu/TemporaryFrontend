import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

type Props = {
  userType: string;
};

export default function BottomNav({ userType }: Props) {
  const router = useRouter();
  const dashboardRoute = `/${userType.toLowerCase().replace(' ', '-')}-dashboard`;

  return (
    <View style={styles.nav}>
      <Button title="Home" onPress={() => router.push(dashboardRoute)} />
      <Button title="Activities" onPress={() => alert('Activities page')} />
      <Button title="Notification" onPress={() => alert('Deals page')} />
      <Button title="Profile" onPress={() => router.push('/profile')} />
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
});