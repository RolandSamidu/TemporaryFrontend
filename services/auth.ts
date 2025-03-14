import api, { setAuthToken } from './api';

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userType: 'Farmer' | 'Intermediate' | 'Rice Producer';
  profilePic?: string; // URI of the image
}

interface LoginData {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  userType: string;
}

export const register = async (data: RegisterData): Promise<AuthResponse> => {
  const formData = new FormData();
  formData.append('firstName', data.firstName);
  formData.append('lastName', data.lastName);
  formData.append('email', data.email);
  formData.append('password', data.password);
  formData.append('userType', data.userType);
  if (data.profilePic) {
    formData.append('profilePic', {
      uri: data.profilePic,
      type: 'image/jpeg',
      name: 'profile.jpg',
    } as any);
  }

  const response = await api.post<AuthResponse>('/auth/register', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  setAuthToken(response.data.token);
  return response.data;
};

export const login = async (data: LoginData): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/login', data);
  setAuthToken(response.data.token);
  return response.data;
};

export const logout = () => {
  setAuthToken(null);
};