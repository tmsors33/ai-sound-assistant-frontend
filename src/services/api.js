import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'https://cb10-221-148-104-162.ngrok-free.app/api';

/**
 * 통합 사운드 검색 함수
 * @param {string} query - 검색어
 * @param {Object} filters - 검색 필터
 * @returns {Promise} 검색 결과
 */
export const searchSounds = async (query, filters = {}) => {
  try {
    const { type, format, concept } = filters;
    
    const params = new URLSearchParams();
    params.append('query', query);
    
    if (type) params.append('type', type);
    if (format) params.append('format', format);
    if (concept) params.append('concept', concept);
    
    const response = await axios.get(`${API_URL}/search`, { params });
    return response.data;
  } catch (error) {
    console.error('API 검색 오류:', error);
    throw error;
  }
};

/**
 * AudioJungle 검색 함수
 * @param {string} query - 검색어
 * @param {Object} filters - 검색 필터
 * @returns {Promise} 검색 결과
 */
export const searchAudioJungle = async (query, filters = {}) => {
  try {
    const { type, format, concept } = filters;
    
    const params = new URLSearchParams();
    params.append('query', query);
    
    if (type) params.append('type', type);
    if (format) params.append('format', format);
    if (concept) params.append('concept', concept);
    
    const response = await axios.get(`${API_URL}/audiojungle/search`, { params });
    return response.data;
  } catch (error) {
    console.error('AudioJungle 검색 오류:', error);
    throw error;
  }
};

/**
 * FreeSound 검색 함수
 * @param {string} query - 검색어
 * @param {Object} filters - 검색 필터
 * @returns {Promise} 검색 결과
 */
export const searchFreeSound = async (query, filters = {}) => {
  try {
    const { type, format, concept } = filters;
    
    const params = new URLSearchParams();
    params.append('query', query);
    
    if (type) params.append('type', type);
    if (format) params.append('format', format);
    if (concept) params.append('concept', concept);
    
    const response = await axios.get(`${API_URL}/freesound/search`, { params });
    return response.data;
  } catch (error) {
    console.error('FreeSound 검색 오류:', error);
    throw error;
  }
};

/**
 * SoundCloud 검색 함수
 * @param {string} query - 검색어
 * @param {Object} filters - 검색 필터
 * @returns {Promise} 검색 결과
 */
export const searchSoundCloud = async (query, filters = {}) => {
  try {
    const { type, format, concept } = filters;
    
    const params = new URLSearchParams();
    params.append('query', query);
    
    if (type) params.append('type', type);
    if (format) params.append('format', format);
    if (concept) params.append('concept', concept);
    
    const response = await axios.get(`${API_URL}/soundcloud/search`, { params });
    return response.data;
  } catch (error) {
    console.error('SoundCloud 검색 오류:', error);
    throw error;
  }
}; 