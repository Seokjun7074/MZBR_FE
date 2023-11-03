import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export async function getNewAccessToken(refreshToken: string): Promise<string | null> {
  try {
    const response = await axios.post(BASE_URL + '/user/auth/refresh', {
      refreshToken: refreshToken,
    });
    if (response.data.success) {
      return response.data.accessToken;
    } else {
      throw new Error('Failed to refresh token');
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
