import axios from 'axios';

// API URL 업데이트 - 고정된 백엔드 URL로 변경
export const BASE_URL = process.env.REACT_APP_API_URL || 'https://aad7-218-239-84-61.ngrok-free.app';
// 프록시 설정을 위한 중간 처리
const getApiUrl = () => {
  // 환경 변수 확인
  console.log('환경 변수 REACT_APP_API_URL:', process.env.REACT_APP_API_URL);
  
  // Vercel 배포 환경에서 접근하는 경우 (고정된 백엔드 URL 사용)
  if (window.location.href.includes('vercel.app')) {
    console.log('Vercel 환경 감지, API URL:', `${BASE_URL}/api`);
    return `${BASE_URL}/api`;
  }
  
  // ngrok URL을 통해 접근하는 경우
  if (window.location.href.includes('ngrok-free.app')) {
    const apiBaseUrl = process.env.REACT_APP_API_URL || BASE_URL;
    console.log('ngrok 환경 감지, API URL:', `${apiBaseUrl}/api`);
    return `${apiBaseUrl}/api`;
  }
  
  // 로컬에서 접근하는 경우
  console.log('로컬 환경 감지, API URL:', `${BASE_URL}/api`);
  return `${BASE_URL}/api`;
};

const API_URL = getApiUrl();

// 디버깅 정보 출력
console.log('현재 API URL:', API_URL);
console.log('환경 변수:', process.env.REACT_APP_API_URL);
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