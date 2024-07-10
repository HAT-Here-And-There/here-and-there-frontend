export const fetchSavedPlaces = async () => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_DOMAIN}/tour/liked-place`
    );
    if (!response.ok) {
      throw new Error('저장된 장소 불러오기 실패');
    }
    return await response.json();
  } catch (error) {
    console.error('저장된 장소 불러오기 실패:', error);
    throw error;
  }
};

export const fetchChatRoomData = async (placeId: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_DOMAIN}/chat/chats?placeId=${placeId}`
    );
    if (response.ok) {
      return await response.json();
    } else {
      console.error(
        'Failed to fetch chat room data:',
        response.status,
        response.statusText
      );
      throw new Error('Fetching chat room data failed');
    }
  } catch (error) {
    console.error('Error fetching chat room data:', error);
    throw error;
  }
};
