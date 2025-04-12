import axios from 'axios';

// API URL 형식 수정 - 환경 변수에 /api가 포함되지 않도록 함
const BASE_URL = process.env.REACT_APP_API_URL || 'https://96d9-218-239-84-61.ngrok-free.app';
const API_URL = `${BASE_URL}/api`;

// 디버깅 정보 출력
console.log('현재 API URL:', API_URL);
console.log('환경 변수:', process.env.REACT_APP_API_URL);

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
    
    const requestURL = `${API_URL}/search`;
    console.log('요청 URL:', requestURL);
    console.log('요청 매개변수:', Object.fromEntries(params));
    
    const response = await axios.get(requestURL, { params });
    console.log('응답 데이터:', response.data);
    return response.data;
  } catch (error) {
    console.error('API 검색 오류:', error);
    console.error('오류 상세:', error.response ? error.response.data : error.message);
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