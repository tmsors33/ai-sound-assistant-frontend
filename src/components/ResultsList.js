import React, { useState } from 'react';
import styled from 'styled-components';
import { FaPlay, FaPause, FaDownload, FaExternalLinkAlt, FaMusic, FaVolumeMute } from 'react-icons/fa';

const ResultsContainer = styled.div`
  margin-top: 2rem;
`;

const SourceSection = styled.div`
  margin-bottom: 2rem;
  border: 1px solid #eee;
  border-radius: 10px;
  overflow: hidden;
`;

const SourceHeader = styled.div`
  background-color: #f5f5f5;
  padding: 1rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #eee;
`;

const SourceTitle = styled.h3`
  margin: 0;
  color: #333;
  font-size: 1.2rem;
`;

const ItemsCount = styled.span`
  color: #666;
  font-size: 0.9rem;
`;

const ItemsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  padding: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const ItemCard = styled.div`
  border: 1px solid #eee;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  height: 100%;
  display: flex;
  flex-direction: column;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  }
`;

const ItemThumbnail = styled.div`
  height: 140px;
  background-color: #f0f0f0;
  background-image: ${props => props.src ? `url(${props.src})` : 'none'};
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const PlayButton = styled.button`
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: rgba(74, 144, 226, 0.9);
  }
`;

const ItemContent = styled.div`
  padding: 1rem;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
`;

const ItemTitle = styled.h4`
  margin: 0 0 0.5rem;
  color: #333;
  font-size: 1.1rem;
`;

const ItemDescription = styled.p`
  margin: 0 0 1rem;
  color: #666;
  font-size: 0.9rem;
  flex-grow: 1;
`;

const ItemMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

const MetaItem = styled.span`
  font-size: 0.8rem;
  color: #888;
  display: flex;
  align-items: center;
  
  svg {
    margin-right: 0.25rem;
  }
`;

const Price = styled.span`
  font-weight: bold;
  color: #4a90e2;
`;

const ItemActions = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-top: auto;
`;

const ActionButton = styled.a`
  text-decoration: none;
  padding: 0.5rem 0.75rem;
  font-size: 0.9rem;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
  
  svg {
    margin-right: 0.3rem;
  }
  
  &.primary {
    background-color: #4a90e2;
    color: white;
    
    &:hover {
      background-color: #3a80d2;
    }
  }
  
  &.secondary {
    background-color: #f0f0f0;
    color: #333;
    
    &:hover {
      background-color: #e0e0e0;
    }
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  margin-top: 0.5rem;
`;

const Tag = styled.span`
  font-size: 0.75rem;
  background-color: #f0f0f0;
  color: #666;
  padding: 0.25rem 0.5rem;
  border-radius: 3px;
`;

const NoResults = styled.div`
  text-align: center;
  padding: 3rem;
  color: #666;
  
  h3 {
    margin-bottom: 1rem;
  }
`;

const SourceIcon = styled.span`
  width: 24px;
  height: 24px;
  margin-right: 0.5rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  img {
    max-width: 100%;
    max-height: 100%;
  }
`;

const AuthorInfo = styled.div`
  font-size: 0.85rem;
  margin-bottom: 0.5rem;
  color: #777;
`;

const formatDuration = (duration) => {
  if (!duration) return '';
  return duration;
};

const getSourceIcon = (source) => {
  switch(source.toLowerCase()) {
    case 'audiojungle':
      return '/logos/audiojungle.png';
    case 'freesound':
      return '/logos/freesound.png';
    case 'soundcloud':
      return '/logos/soundcloud.png';
    case 'envato elements':
      return '/logos/envato.png';
    default:
      return null;
  }
};

const defaultThumbnail = (type) => {
  switch(type) {
    case 'bgm':
      return '/thumbnails/default-music.jpg';
    case 'sfx':
      return '/thumbnails/default-sfx.jpg';
    case 'ambi':
      return '/thumbnails/default-ambient.jpg';
    default:
      return '/thumbnails/default-sound.jpg';
  }
};

const ResultsList = ({ results }) => {
  const [playing, setPlaying] = useState(null);
  const [audio, setAudio] = useState(null);

  const handlePlay = (item) => {
    // 현재 재생 중인 오디오가 있으면 정지
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }

    // 같은 아이템을 다시 클릭하면 정지
    if (playing === `${item.source}-${item.id}`) {
      setPlaying(null);
      setAudio(null);
      return;
    }

    // 미리듣기 URL 가져오기
    const previewUrl = item.preview_url || (item.source === 'FreeSound' ? item.preview : null);
    
    if (previewUrl) {
      const newAudio = new Audio(previewUrl);
      newAudio.play();
      newAudio.onended = () => {
        setPlaying(null);
        setAudio(null);
      };
      setAudio(newAudio);
      setPlaying(`${item.source}-${item.id}`);
    }
  };

  if (!results || results.length === 0) {
    return (
      <NoResults>
        <h3>검색 결과가 없습니다.</h3>
        <p>다른 검색어나 필터를 사용해 보세요.</p>
      </NoResults>
    );
  }

  return (
    <ResultsContainer>
      {results.map((source, index) => (
        <SourceSection key={index}>
          <SourceHeader>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <SourceIcon>
                {getSourceIcon(source.source) && <img src={getSourceIcon(source.source)} alt={source.source} />}
              </SourceIcon>
              <SourceTitle>{source.source}</SourceTitle>
            </div>
            <ItemsCount>{source.items?.length || 0}개 결과</ItemsCount>
          </SourceHeader>
          
          {source.items && source.items.length > 0 ? (
            <ItemsList>
              {source.items.map((item, idx) => (
                <ItemCard key={idx}>
                  <ItemThumbnail src={item.thumbnail || item.artwork_url || defaultThumbnail(item.type)}>
                    <PlayButton onClick={() => handlePlay(item)}>
                      {playing === `${source.source}-${item.id}` ? <FaPause size={18} /> : <FaPlay size={18} />}
                    </PlayButton>
                  </ItemThumbnail>
                  
                  <ItemContent>
                    <ItemTitle>{item.title}</ItemTitle>
                    
                    {item.author && <AuthorInfo>by {item.author || item.user}</AuthorInfo>}
                    
                    <ItemDescription>
                      {item.description || '설명이 없습니다.'}
                    </ItemDescription>
                    
                    <ItemMeta>
                      {item.duration && (
                        <MetaItem>
                          <FaMusic size={12} /> {formatDuration(item.duration)}
                        </MetaItem>
                      )}
                      {item.format && (
                        <MetaItem>
                          {item.format.toUpperCase()}
                        </MetaItem>
                      )}
                      {item.type && (
                        <MetaItem>
                          {item.type === 'bgm' ? '배경음악' :
                           item.type === 'sfx' ? '효과음' :
                           item.type === 'ambi' ? '환경음' : item.type}
                        </MetaItem>
                      )}
                      {item.price && (
                        <Price>{item.price}</Price>
                      )}
                    </ItemMeta>
                    
                    {item.tags && item.tags.length > 0 && (
                      <TagsContainer>
                        {item.tags.slice(0, 4).map((tag, tagIdx) => (
                          <Tag key={tagIdx}>{tag}</Tag>
                        ))}
                      </TagsContainer>
                    )}
                    
                    <ItemActions>
                      <ActionButton 
                        href={item.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="primary"
                      >
                        <FaExternalLinkAlt size={14} /> 방문
                      </ActionButton>
                      
                      {item.download && (
                        <ActionButton 
                          href={item.download} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="secondary"
                        >
                          <FaDownload size={14} /> 다운로드
                        </ActionButton>
                      )}
                    </ItemActions>
                  </ItemContent>
                </ItemCard>
              ))}
            </ItemsList>
          ) : (
            <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
              결과가 없습니다.
            </div>
          )}
        </SourceSection>
      ))}
    </ResultsContainer>
  );
};

export default ResultsList; 