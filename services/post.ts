import api from './api';

interface PostData {
  breed: string;
  expectedPrice: string;
  kilogram: string;
  location: string;
  description: string;
  userType: string;
  image?: string; // URI of the image
}

interface Post {
  _id: string;
  userId: string;
  userType: string;
  breed: string;
  expectedPrice: number;
  kilogram: number;
  location: string;
  description: string;
  image?: string;
  createdAt: string;
}

export const createPost = async (data: PostData): Promise<Post> => {
  const formData = new FormData();
  formData.append('breed', data.breed);
  formData.append('expectedPrice', data.expectedPrice);
  formData.append('kilogram', data.kilogram);
  formData.append('location', data.location);
  formData.append('description', data.description);
  formData.append('userType', data.userType);
  if (data.image) {
    formData.append('image', {
      uri: data.image,
      type: 'image/jpeg',
      name: 'post.jpg',
    } as any);
  }

  const response = await api.post<Post>('/posts', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

export const getPosts = async (): Promise<Post[]> => {
  const response = await api.get<Post[]>('/posts');
  return response.data;
};