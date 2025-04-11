import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { FaUpload, FaPlay, FaPause, FaDownload } from 'react-icons/fa';

const CreatorContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
  color: #333;
`;

const FormSection = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 1rem;
  color: #444;
`;

const InputGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #555;
`;

const TextInput = styled.input`
  width: 100%;
  padding: 0.7rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.7rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 1rem;
  font-size: 1rem;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 0.7rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
`;

const FileInput = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;

const HiddenInput = styled.input`
  position: absolute;
  width: 0;
  height: 0;
  opacity: 0;
`;

const FileInputButton = styled.div`
  display: flex;
  align-items: center;
  padding: 0.8rem 1.2rem;
  background-color: #f4f4f4;
  border: 2px dashed #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background-color: #ebebeb;
    border-color: #ccc;
  }
  
  svg {
    margin-right: 0.5rem;
    color: #4a90e2;
  }
`;

const FileName = styled.div`
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: #666;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1rem 0;
`;

const Tag = styled.div`
  background-color: ${props => props.selected ? '#4a90e2' : '#f0f0f0'};
  color: ${props => props.selected ? 'white' : '#555'};
  padding: 0.4rem 0.8rem;
  border-radius: 30px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s;
  
  &:hover {
    background-color: ${props => props.selected ? '#3a80d2' : '#e4e4e4'};
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.primary ? '#4a90e2' : '#f4f4f4'};
  color: ${props => props.primary ? 'white' : '#333'};
  border: none;
  border-radius: 4px;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  
  &:hover {
    background-color: ${props => props.primary ? '#3a80d2' : '#e4e4e4'};
  }
  
  &:disabled {
    background-color: #cccccc;
    cursor: not-allowed;
    opacity: 0.7;
  }
  
  svg {
    margin-right: 0.5rem;
  }
`;

const ResultSection = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  margin-top: 2rem;
`;

const AudioPreview = styled.div`
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 1rem;
  margin: 1rem 0;
  display: flex;
  align-items: center;
`;

const AudioWaveform = styled.div`
  flex-grow: 1;
  height: 80px;
  background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDAgMjAiPgogIDxwYXRoIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2NjY2NjYyIgc3Ryb2tlLXdpZHRoPSIxIgogICAgICAgIGQ9Ik0gMCwxMCBMIDQsOCBMIDgsMyBMIDEyLDcgTCAxNiw0IEwgMjAsNyBMIDI0LDUgTCAyOCw5IEwgMzIsMTEgTCAzNiw3IEwgNDAsNSBMIDQ0LDEzIEwgNDgsMTAgTCA1MiwxNCBMIDU2LDggTCA2MCwxMiBMIDY0LDcgTCA2OCw0IEwgNzIsMTQgTCA3NiwxMCBMIDgwLDUgTCA4NCwxMSBMIDg4LDcgTCA5Miw5IEwgOTYsMTUgTCAxMDAsMTAiLz4KPC9zdmc+Cg==');
  background-size: cover;
  background-position: center;
  margin: 0 1rem;
`;

const PlayButton = styled.button`
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
  
  &:hover {
    background-color: #3a80d2;
  }
  
  svg {
    font-size: 1rem;
  }
`;

const LoadingIndicator = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  
  .spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    width: 36px;
    height: 36px;
    border-radius: 50%;
    border-left-color: #4a90e2;
    animation: spin 1s ease infinite;
    margin-bottom: 1rem;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const SoundCreator = () => {
  const [soundType, setSoundType] = useState('bgm');
  const [description, setDescription] = useState('');
  const [referenceFile, setReferenceFile] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedSound, setGeneratedSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const audioRef = useRef(null);
  
  // 사운드 타입 옵션
  const soundTypeOptions = [
    { value: 'bgm', label: '배경음악 (BGM)' },
    { value: 'sfx', label: '효과음 (SFX)' },
    { value: 'ambience', label: '환경음 (Ambience)' },
    { value: 'vocals', label: '보컬/음성 (Vocals)' }
  ];
  
  // 분위기 태그 옵션
  const moodTags = [
    '신나는', '차분한', '웅장한', '미스터리한', '행복한', '슬픈',
    '긴장감 있는', '귀여운', '로맨틱한', '어두운', '판타지', '미래적인'
  ];
  
  // 파일 선택 핸들러
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // 오디오 파일 검증
    const validAudioTypes = ['audio/mpeg', 'audio/wav', 'audio/ogg', 'audio/x-wav', 'audio/flac'];
    if (!validAudioTypes.includes(file.type)) {
      alert('오디오 파일만 선택해주세요 (.mp3, .wav, .ogg, .flac)');
      return;
    }
    
    setReferenceFile(file);
  };
  
  // 태그 토글 핸들러
  const toggleTag = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };
  
  // 사운드 생성 핸들러
  const handleGenerateSound = async () => {
    if (!description && !referenceFile && selectedTags.length === 0) {
      alert('설명, 레퍼런스 파일, 또는 분위기 태그 중 하나 이상을 선택해주세요.');
      return;
    }
    
    setIsGenerating(true);
    setGeneratedSound(null);
    
    try {
      // API 요청 준비
      const formData = new FormData();
      formData.append('description', description);
      formData.append('soundType', soundType);
      formData.append('tags', selectedTags.join(','));
      
      if (referenceFile) {
        formData.append('referenceFile', referenceFile);
      }
      
      console.log('API 요청 시작:', 'http://localhost:5002/api/generate-sound');
      
      // API 호출
      const response = await fetch('http://localhost:5002/api/generate-sound', {
        method: 'POST',
        body: formData
      });
      
      console.log('API 응답 상태:', response.status, response.statusText);
      const contentType = response.headers.get('content-type');
      console.log('응답 Content-Type:', contentType);
      
      // 응답 내용 로깅
      const rawText = await response.text();
      console.log('응답 원본:', rawText);
      
      if (!response.ok) {
        console.error('API 에러 응답:', rawText);
        throw new Error(`API 에러 (${response.status}): ${rawText.substring(0, 100)}`);
      }
      
      let soundData;
      try {
        soundData = JSON.parse(rawText);
      } catch (parseError) {
        console.error('JSON 파싱 에러:', parseError, 'Raw 응답:', rawText.substring(0, 200));
        throw new Error(`JSON 파싱 에러: ${parseError.message}`);
      }
      
      console.log('파싱된 응답 데이터:', soundData);
      
      // 생성 결과 설정
      setGeneratedSound({
        name: soundData.name,
        duration: soundData.duration,
        type: soundData.type,
        url: soundData.url,
        previewUrl: soundData.previewUrl
      });
    } catch (error) {
      console.error('사운드 생성 오류:', error);
      alert('사운드 생성 중 오류가 발생했습니다: ' + error.message);
    } finally {
      setIsGenerating(false);
    }
  };
  
  // 재생/일시정지 토글
  const togglePlayPause = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    
    setIsPlaying(!isPlaying);
  };
  
  // 오디오 이벤트 핸들러
  React.useEffect(() => {
    const audioElement = audioRef.current;
    if (audioElement) {
      const handleEnded = () => setIsPlaying(false);
      audioElement.addEventListener('ended', handleEnded);
      
      return () => {
        // cleanup 함수에서 요소 존재 여부 확인
        if (audioElement) {
          audioElement.removeEventListener('ended', handleEnded);
        }
      };
    }
  }, [generatedSound]);
  
  return (
    <CreatorContainer>
      <Title>AI 사운드 제작기</Title>
      
      <FormSection>
        <SectionTitle>사운드 특성 설정</SectionTitle>
        
        <InputGroup>
          <Label htmlFor="sound-type">사운드 타입</Label>
          <Select 
            id="sound-type"
            value={soundType}
            onChange={(e) => setSoundType(e.target.value)}
            disabled={isGenerating}
          >
            {soundTypeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </InputGroup>
        
        <InputGroup>
          <Label htmlFor="sound-description">원하는 사운드 설명</Label>
          <Textarea 
            id="sound-description"
            placeholder="원하는 사운드의 특성과 느낌을 자세히 설명해주세요. 예: '빗소리가 들리는 카페 분위기의 잔잔한 로파이 비트'"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isGenerating}
          />
        </InputGroup>
        
        <InputGroup>
          <Label>분위기 태그 선택 (선택사항)</Label>
          <TagsContainer>
            {moodTags.map(tag => (
              <Tag 
                key={tag} 
                selected={selectedTags.includes(tag)}
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </Tag>
            ))}
          </TagsContainer>
        </InputGroup>
        
        <InputGroup>
          <Label>레퍼런스 파일 업로드 (선택사항)</Label>
          <FileInput>
            <HiddenInput 
              type="file" 
              id="reference-file" 
              onChange={handleFileChange}
              accept="audio/*" 
              disabled={isGenerating}
            />
            <FileInputButton onClick={() => document.getElementById('reference-file').click()}>
              <FaUpload /> 레퍼런스 사운드 업로드
            </FileInputButton>
            {referenceFile && (
              <FileName>
                선택된 파일: {referenceFile.name} ({(referenceFile.size / 1024 / 1024).toFixed(2)}MB)
              </FileName>
            )}
          </FileInput>
          <p style={{ fontSize: '0.9rem', color: '#666' }}>
            비슷한 분위기의 사운드를 업로드하면 AI가 참고하여 생성합니다.
          </p>
        </InputGroup>
        
        <ButtonContainer>
          <Button 
            primary 
            onClick={handleGenerateSound}
            disabled={isGenerating}
          >
            {isGenerating ? '생성 중...' : '사운드 생성하기'}
          </Button>
        </ButtonContainer>
      </FormSection>
      
      {isGenerating && (
        <LoadingIndicator>
          <div className="spinner"></div>
          <p>AI가 사운드를 생성하는 중입니다... (약 30초 소요)</p>
        </LoadingIndicator>
      )}
      
      {generatedSound && (
        <ResultSection>
          <SectionTitle>생성된 사운드</SectionTitle>
          
          <AudioPreview>
            <PlayButton onClick={togglePlayPause}>
              {isPlaying ? <FaPause /> : <FaPlay />}
            </PlayButton>
            <AudioWaveform />
            <span>{generatedSound.duration}</span>
            
            {/* 실제 오디오 요소 (화면에 보이지 않음) */}
            <audio 
              ref={audioRef} 
              src={generatedSound.previewUrl} 
              style={{ display: 'none' }} 
              onError={(e) => console.error("오디오 로딩 오류:", e)}
            />
          </AudioPreview>
          
          <ButtonContainer>
            <Button onClick={() => {
              // 생성된 오디오 다운로드
              // 새 창에서 직접 다운로드 URL을 열기
              window.open(generatedSound.previewUrl, '_blank');
            }}>
              <FaDownload /> 다운로드
            </Button>
            <Button onClick={() => setGeneratedSound(null)}>
              새로운 사운드 생성하기
            </Button>
          </ButtonContainer>
        </ResultSection>
      )}
      
      <div style={{ marginTop: '2rem' }}>
        <h3>사용 방법</h3>
        <p>1. 원하는 사운드 타입을 선택합니다 (BGM, 효과음, 환경음, 보컬)</p>
        <p>2. 원하는 사운드의 특성과 분위기를 자세히 설명합니다</p>
        <p>3. 원하는 분위기 태그를 선택합니다 (선택사항)</p>
        <p>4. 비슷한 사운드 파일을 레퍼런스로 업로드합니다 (선택사항)</p>
        <p>5. '사운드 생성하기' 버튼을 클릭하여 AI가 사운드를 생성할 때까지 기다립니다</p>
      </div>
    </CreatorContainer>
  );
};

export default SoundCreator;