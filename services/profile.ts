import api from './api';

interface ProfileData {
  firstName?: string;
  lastName?: string;
  email?: string;
  profilePic?: string; // URI of the image
}

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  userType: string;
  profilePic?: string;
}

export const getProfile = async (): Promise<User> => {
  const response = await api.get<User>('/profile');
  return response.data;
};

export const updateProfile = async (data: ProfileData): Promise<User> => {
  const formData = new FormData();
  if (data.firstName) formData.append('firstName', data.firstName);
  if (data.lastName) formData.append('lastName', data.lastName);
  if (data.email) formData.append('email', data.email);
  if (data.profilePic) {
    formData.append('profilePic', {
      uri: data.profilePic,
      type: 'image/jpeg',
      name: 'profile.jpg',
    } as any);
  }

  const response = await api.put<User>('/profile', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const deleteProfile = async (): Promise<{ message: string }> => {
  const response = await api.delete<{ message: string }>('/profile');
  return response.data;
};