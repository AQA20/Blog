import api from './api';

export const fetchImage = async (id) => {
  try {
    const response = await api.get(`/api/image/${id}`, {
      responseType: 'arraybuffer',
    });

    const blob = new Blob([response.data], {
      type: response.headers['content-type'],
    });
    const url = URL.createObjectURL(blob);
    return url;
  } catch (error) {
    console.error('Error fetching image:', error);
    // Handle error gracefully (e.g., display a placeholder)
  }
};
