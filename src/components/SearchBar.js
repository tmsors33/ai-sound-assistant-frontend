import React from 'react';
import styled from 'styled-components';
import { FaSearch } from 'react-icons/fa';

const SearchBarContainer = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.8rem 1.2rem;
  font-size: 1.1rem;
  border: 2px solid #ddd;
  border-radius: 4px 0 0 4px;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    border-color: #4a90e2;
  }
`;

const SearchButton = styled.button`
  background-color: #4a90e2;
  color: white;
  border: none;
  border-radius: 0 4px 4px 0;
  padding: 0 1.5rem;
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background-color 0.3s;

  &:hover {
    background-color: #3a80d2;
  }

  svg {
    margin-right: 0.5rem;
  }
`;

const SearchBar = ({ searchQuery, setSearchQuery, onSearch }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  return (
    <SearchBarContainer>
      <SearchInput
        type="text"
        placeholder="원하는 사운드를 검색하세요 (예: 자연 소리, 긴장감 있는 BGM...)"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <SearchButton onClick={onSearch}>
        <FaSearch /> 검색
      </SearchButton>
    </SearchBarContainer>
  );
};

export default SearchBar; 