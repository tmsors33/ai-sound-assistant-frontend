import React from 'react';
import styled from 'styled-components';

const FiltersContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const FilterGroup = styled.div`
  flex: 1;
  min-width: 200px;
`;

const FilterLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #555;
`;

const FilterSelect = styled.select`
  width: 100%;
  padding: 0.7rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: white;
  font-size: 1rem;
  cursor: pointer;
`;

const SearchFilters = ({ filters, onFilterChange }) => {
  const typeOptions = [
    { value: '', label: '모든 타입' },
    { value: 'bgm', label: 'BGM (배경음악)' },
    { value: 'sfx', label: '효과음' },
    { value: 'vocal', label: '보컬/음성' }
  ];

  const formatOptions = [
    { value: '', label: '모든 포맷' },
    { value: 'mp3', label: 'MP3' },
    { value: 'wav', label: 'WAV' },
    { value: 'flac', label: 'FLAC' },
    { value: 'ogg', label: 'OGG' },
    { value: 'aiff', label: 'AIFF' }
  ];

  const conceptOptions = [
    { value: '', label: '모든 컨셉' },
    { value: 'happy', label: '밝은/행복한' },
    { value: 'sad', label: '슬픈/우울한' },
    { value: 'epic', label: '웅장한/서사적인' },
    { value: 'scary', label: '무서운/공포스러운' },
    { value: 'relaxing', label: '편안한/릴렉싱' },
    { value: 'tense', label: '긴장감 있는' },
    { value: 'exciting', label: '신나는/흥분되는' },
    { value: 'romantic', label: '로맨틱한/사랑스러운' }
  ];

  return (
    <FiltersContainer>
      <FilterGroup>
        <FilterLabel htmlFor="type-filter">타입</FilterLabel>
        <FilterSelect
          id="type-filter"
          value={filters.type}
          onChange={(e) => onFilterChange('type', e.target.value)}
        >
          {typeOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </FilterSelect>
      </FilterGroup>

      <FilterGroup>
        <FilterLabel htmlFor="format-filter">파일 포맷</FilterLabel>
        <FilterSelect
          id="format-filter"
          value={filters.format}
          onChange={(e) => onFilterChange('format', e.target.value)}
        >
          {formatOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </FilterSelect>
      </FilterGroup>

      <FilterGroup>
        <FilterLabel htmlFor="concept-filter">분위기/컨셉</FilterLabel>
        <FilterSelect
          id="concept-filter"
          value={filters.concept}
          onChange={(e) => onFilterChange('concept', e.target.value)}
        >
          {conceptOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </FilterSelect>
      </FilterGroup>
    </FiltersContainer>
  );
};

export default SearchFilters; 