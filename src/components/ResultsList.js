import React, { useState } from 'react';
import styled from 'styled-components';
import { FaPlay, FaPause, FaExternalLinkAlt, FaDownload } from 'react-icons/fa';

const ResultsListContainer = styled.div`
  margin-top: 1rem;
`;

const SourceSection = styled.div`
  margin-bottom: 2rem;
`;

const SourceHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #eee;
`;

const SourceLogo = styled.div`
  font-weight: bold;
  font-size: 1.3rem;
  color: #333;
  margin-right: 1rem;
`;

const SourceStats = styled.div`
  color: #777;
  font-size: 0.9rem;
`;

const ResultsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const ResultCard = styled.div`
  background-color: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

const CardHeader = styled.div`
  height: 140px;
  background-color: #f3f3f3;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const AudioWaveform = styled.div`
  width: 80%;
  height: 60px;
  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMjAiPgogIDxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2NjY2NjYyIgc3Ryb2tlLXdpZHRoPSIxIgogICAgICAgIGQ9Ik0gMCwxMCBMIDQsOCBMIDgsMyBMIDEyLDcgTCAxNiw0IEwgMjAsNyBMIDI0LDUgTCAyOCw5IEwgMzIsMTEgTCAzNiw3IEwgNDAsNSBMIDQ0LDEzIEwgNDgsMTAgTCA1MiwxNCBMIDU2LDggTCA2MCwxMiBMIDY0LDcgTCA2OCw0IEwgNzIsMTQgTCA3NiwxMCBMIDgwLDUgTCA4NCwxMSBMIDg4LDcgTCA5Miw5IEwgOTYsMTUgTCAxMDAsMTAiLz4KPC9zdmc+Cg==');
  background-size: cover;
  background-position: center;
  opacity: 0.7;
`;

const PlayButton = styled.button`
  position: absolute;
  background-color: #4a90e2;
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #3a80d2;
  }
`;

const CardContent = styled.div`
  padding: 1rem;
`;

const CardTitle = styled.h3`
  margin: 0 0 0.5rem 0;
  color: #333;
  font-size: 1.1rem;
`;

const CardMeta = styled.div`
  display: flex;
  margin-bottom: 0.8rem;
  font-size: 0.85rem;
  color: #777;
`;

const MetaItem = styled.div`
  margin-right: 1rem;
  display: flex;
  align-items: center;
`;

const CardTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Tag = styled.span`
  background-color: #f0f0f0;
  color: #555;
  padding: 0.2rem 0.5rem;
  border-radius: 3px;
  font-size: 0.8rem;
`;

const CardActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
`;

const ActionButton = styled.a`
  display: flex;
  align-items: center;
  padding: 0.5rem 0.8rem;
  background-color: ${props => props.primary ? '#4a90e2' : '#f4f4f4'};
  color: ${props => props.primary ? 'white' : '#333'};
  border-radius: 4px;
  text-decoration: none;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${props => props.primary ? '#3a80d2' : '#e4e4e4'};
  }

  svg {
    margin-right: 0.3rem;
  }
`;

const NoResults = styled.div`
  text-align: center;
  padding: 2rem;
  color: #777;
`;

const ResultsList = ({ results }) => {
  const [playingId, setPlayingId] = useState(null);

  const togglePlay = (id) => {
    if (playingId === id) {
      setPlayingId(null);
    } else {
      setPlayingId(id);
    }
  };

  if (!results || results.length === 0) {
    return (
      <NoResults>
        <h3>검색 결과가 없습니다</h3>
        <p>다른 검색어나 필터를 사용해 보세요.</p>
      </NoResults>
    );
  }

  // URL이 유효한지 확인하는 함수
  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      console.error('유효하지 않은 URL:', url);
      return false;
    }
  };

  return (
    <ResultsListContainer>
      {results.map(source => (
        <SourceSection key={source.source}>
          <SourceHeader>
            <SourceLogo>{source.source}</SourceLogo>
            <SourceStats>{source.items.length}개 결과</SourceStats>
          </SourceHeader>

          <ResultsGrid>
            {source.items.map(item => (
              <ResultCard key={item.id}>
                <CardHeader>
                  <AudioWaveform />
                  <PlayButton onClick={() => togglePlay(item.id)}>
                    {playingId === item.id ? <FaPause /> : <FaPlay />}
                  </PlayButton>
                </CardHeader>

                <CardContent>
                  <CardTitle>{item.title}</CardTitle>
                  
                  <CardMeta>
                    <MetaItem>{item.duration}</MetaItem>
                    {item.format && <MetaItem>{item.format.toUpperCase()}</MetaItem>}
                    {item.type && (
                      <MetaItem>
                        {item.type === 'bgm' ? 'BGM' : item.type === 'sfx' ? '효과음' : item.type}
                      </MetaItem>
                    )}
                  </CardMeta>

                  {item.tags && (
                    <CardTags>
                      {item.tags.slice(0, 3).map(tag => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </CardTags>
                  )}

                  <CardActions>
                    {isValidUrl(item.url) && (
                      <ActionButton 
                        href={item.url} 
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => {
                          console.log('링크 클릭:', item.url);
                          // 새 창에서 강제로 열기
                          e.preventDefault();
                          window.open(item.url, '_blank', 'noopener,noreferrer');
                        }}
                      >
                        <FaExternalLinkAlt /> 사이트에서 보기
                      </ActionButton>
                    )}
                    
                    {item.download && isValidUrl(item.download) && (
                      <ActionButton 
                        href={item.download} 
                        target="_blank"
                        rel="noopener noreferrer"
                        primary
                        onClick={(e) => {
                          console.log('다운로드 링크 클릭:', item.download);
                          // 다운로드 링크 처리
                          e.preventDefault();
                          
                          // 다운로드 로직 추가
                          const fileName = item.title.replace(/[^\w\s.-]/g, '') + '.' + (item.format || 'mp3');
                          
                          // Freesound 등은 직접 다운로드 가능
                          if (source.source === 'FreeSound') {
                            window.open(item.download, '_blank', 'noopener,noreferrer');
                          } else {
                            // 다른 사이트는 사이트 방문 안내
                            if (window.confirm(`'${item.title}' 파일을 다운로드하려면 원본 사이트에서 진행해야 합니다.\n\n사이트로 이동하시겠습니까?`)) {
                              window.open(item.url, '_blank', 'noopener,noreferrer');
                            }
                          }
                        }}
                      >
                        <FaDownload /> 다운로드
                      </ActionButton>
                    )}
                  </CardActions>
                </CardContent>
              </ResultCard>
            ))}
          </ResultsGrid>
        </SourceSection>
      ))}
    </ResultsListContainer>
  );
};

export default ResultsList; 