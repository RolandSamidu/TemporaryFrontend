import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';

export default function ProfileScreen() {
  const router = useRouter();
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [profilePic, setProfilePic] = useState<string | null>(null);

  const handleUpdate = async () => {
    try {
      await axios.put('http://your-backend-url/api/profile', { firstName, lastName, email });
      alert('Profile updated successfully');
    } catch (error) {
      console.error(error);
      alert('Update failed');
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete('http://your-backend-url/api/profile');
      router.push('/');
    } catch (error) {
      console.error(error);
      alert('Delete failed');
    }
  };

  const handleLogout = () => {
    router.push('/');
  };

  return (
    <View style={styles.container}>
      {profilePic && <Image source={{ uri: profilePic }} style={styles.profilePic} />}
      <Text style={styles.title}>Profile</Text>
      <TextInput style={styles.input} placeholder="First Name" value={firstName} onChangeText={setFirstName} />
      <TextInput style={styles.input} placeholder="Last Name" value={lastName} onChangeText={setLastName} />
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
      <Button title="Update Profile" onPress={handleUpdate} />
      <Button title="Delete Account" onPress={handleDelete} />
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginVertical: 10 },
  profilePic: { width: 100, height: 100, borderRadius: 50, marginBottom: 20 },
});