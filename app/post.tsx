import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

export default function PostScreen() {
  const router = useRouter();
  const { userType = 'Farmer' } = useLocalSearchParams<{ userType: string }>();
  const [image, setImage] = useState<string | null>(null);
  const [breed, setBreed] = useState<string>('');
  const [expectedPrice, setExpectedPrice] = useState<string>('');
  const [kilogram, setKilogram] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ImagePicker.MediaTypeOptions.Images });
    if (!result.canceled) setImage(result.assets[0].uri);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('breed', breed);
    formData.append('expectedPrice', expectedPrice);
    formData.append('kilogram', kilogram);
    formData.append('location', location);
    formData.append('description', description);
    formData.append('userType', userType);
    if (image) {
      formData.append('image', { uri: image, type: 'image/jpeg', name: 'post.jpg' } as any);
    }

    try {
      await axios.post('http://your-backend-url/api/posts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      router.back();
    } catch (error) {
      console.error(error);
      alert('Post creation failed');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{userType === 'Farmer' ? 'Add Harvest Post' : 'View/Manage Posts'}</Text>
      {userType === 'Farmer' && (
        <>
          <Button title="Upload Image" onPress={pickImage} />
          {image && <Image source={{ uri: image }} style={styles.image} />}
          <TextInput style={styles.input} placeholder="Breed" value={breed} onChangeText={setBreed} />
          <TextInput style={styles.input} placeholder="Expected Price" value={expectedPrice} onChangeText={setExpectedPrice} keyboardType="numeric" />
          <TextInput style={styles.input} placeholder="Kilogram" value={kilogram} onChangeText={setKilogram} keyboardType="numeric" />
          <TextInput style={styles.input} placeholder="Location" value={location} onChangeText={setLocation} />
          <TextInput style={styles.input} placeholder="Description" value={description} onChangeText={setDescription} />
          <Button title="Submit Post" onPress={handleSubmit} />
        </>
      )}
      {userType !== 'Farmer' && (
        <Text>Placeholder for viewing posts and bidding (Intermediate/Rice Producer)</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
  input: { borderWidth: 1, padding: 10, marginVertical: 10 },
  image: { width: 100, height: 100, marginVertical: 10 },
});