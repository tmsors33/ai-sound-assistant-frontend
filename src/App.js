import React, { useState } from 'react';
import styled from 'styled-components';
import SearchBar from './components/SearchBar';
import SearchFilters from './components/SearchFilters';
import ResultsList from './components/ResultsList';
import { searchSounds } from './services/api';
import SoundCreator from './components/SoundCreator';
import SoundConverter from './components/SoundConverter';

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: 'Arial', sans-serif;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: #333;
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  color: #666;
  font-size: 1.2rem;
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 2rem;
  border-bottom: 2px solid #eee;
`;

const Tab = styled.div`
  padding: 1rem 2rem;
  font-size: 1.1rem;
  font-weight: ${props => props.active ? 'bold' : 'normal'};
  color: ${props => props.active ? '#4a90e2' : '#666'};
  border-bottom: ${props => props.active ? '3px solid #4a90e2' : 'none'};
  cursor: pointer;
  margin-right: 1rem;
  transition: all 0.3s;
  
  &:hover {
    color: #4a90e2;
  }
`;

const ContentContainer = styled.div`
  background-color: #f9f9f9;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
`;

const ResultsContainer = styled.div`
  min-height: 300px;
`;

const LoadingContainer = styled.div`
  text-align: center;
  padding: 2rem;
`;

// 탭 정의
const TABS = {
  SEARCH: '사운드 검색',
  CREATE: '사운드 제작',
  CONVERT: '사운드 확장자 변경'
};

function App() {
  const [activeTab, setActiveTab] = useState(TABS.SEARCH);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    type: '',
    format: '',
    concept: ''
  });
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setSearched(true);
    
    try {
      const searchResults = await searchSounds(searchQuery, filters);
      setResults(searchResults.results || []);
    } catch (error) {
      console.error('검색 오류:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };
  
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  // 현재 활성화된 탭에 따라 컨텐츠를 렌더링
  const renderContent = () => {
    switch (activeTab) {
      case TABS.SEARCH:
        return (
          <>
            <SearchBar 
              searchQuery={searchQuery} 
              setSearchQuery={setSearchQuery} 
              onSearch={handleSearch} 
            />
            <SearchFilters 
              filters={filters} 
              onFilterChange={handleFilterChange} 
            />
            <ResultsContainer>
              {loading ? (
                <LoadingContainer>
                  <h2>검색 중...</h2>
                  <p>여러 사이트에서 결과를 가져오고 있습니다.</p>
                </LoadingContainer>
              ) : (
                searched && <ResultsList results={results} />
              )}
            </ResultsContainer>
          </>
        );
      case TABS.CREATE:
        return <SoundCreator />;
      case TABS.CONVERT:
        return <SoundConverter />;
      default:
        return null;
    }
  };

  return (
    <AppContainer>
      <Header>
        <Title>AI 사운드 비서</Title>
        <Subtitle>사운드 검색, AI제작, 변환을 한 번에 해보세요.</Subtitle>
      </Header>
      
      <TabContainer>
        {Object.values(TABS).map(tab => (
          <Tab 
            key={tab} 
            active={activeTab === tab} 
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </Tab>
        ))}
      </TabContainer>
      
      <ContentContainer>
        {renderContent()}
      </ContentContainer>
    </AppContainer>
  );
}

export default App; 