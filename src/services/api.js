import axios from 'axios';

// API URL 설정 - 환경 변수 또는 기본값 사용
const getBackendUrl = () => {
  // 1. 환경 변수에서 URL 확인
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }
  
  // 2. 현재 환경에 따라 URL 결정
  if (process.env.NODE_ENV === 'production') {
    // Vercel 배포 환경인 경우 백엔드 URL 사용
    return 'https://9d79-218-239-84-61.ngrok-free.app';
  }
  
  // 3. 개발 환경인 경우 로컬 URL 사용
  return 'http://localhost:5001';
};

// 백엔드 URL 설정
export const BASE_URL = getBackendUrl();

// 백엔드 서버 URL 설정
const getApiUrl = () => {
  console.log('API 베이스 URL:', BASE_URL);
  return `${BASE_URL}/api`;
};

export const API_URL = getApiUrl();

// 디버깅 정보 출력
console.log('현재 API URL:', API_URL);
console.log('BASE_URL:', BASE_URL);
console.log('현재 위치:', window.location.href);

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

/**
 * ZapSplat 검색 함수
 * @param {string} query - 검색어
 * @param {Object} filters - 검색 필터
 * @returns {Promise} 검색 결과
 */
export const searchZapSplat = async (query, filters = {}) => {
  try {
    const { type, format, concept } = filters;
    
    const params = new URLSearchParams();
    params.append('query', query);
    
    if (type) params.append('type', type);
    if (format) params.append('format', format);
    if (concept) params.append('concept', concept);
    
    const response = await axios.get(`${API_URL}/zapsplat/search`, { params });
    return response.data;
  } catch (error) {
    console.error('ZapSplat 검색 오류:', error);
    throw error;
  }
};

/**
 * Envato 검색 함수
 * @param {string} query - 검색어
 * @param {Object} filters - 검색 필터
 * @returns {Promise} 검색 결과
 */
export const searchEnvato = async (query, filters = {}) => {
  try {
    const { type, format, concept } = filters;
    
    const params = new URLSearchParams();
    params.append('query', query);
    
    if (type) params.append('type', type);
    if (format) params.append('format', format);
    if (concept) params.append('concept', concept);
    
    const response = await axios.get(`${API_URL}/envato/search`, { params });
    return response.data;
  } catch (error) {
    console.error('Envato 검색 오류:', error);
    throw error;
  }
}; 