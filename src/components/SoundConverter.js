import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FaUpload, FaDownload, FaExchangeAlt, FaVolumeUp } from 'react-icons/fa';
import { BASE_URL } from '../services/api';

const ConverterContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  margin-bottom: 1.5rem;
  color: #333;
`;

const ConverterForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const FormSection = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
`;

const SectionTitle = styled.h3`
  margin-top: 0;
  margin-bottom: 1rem;
  color: #444;
`;

const FileInput = styled.div`
  position: relative;
  margin-bottom: 1rem;
`;

const InputLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #555;
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

const FormatSelector = styled.div`
  margin-bottom: 1.5rem;
`;

const Select = styled.select`
  width: 100%;
  padding: 0.7rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
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

const ConversionInfo = styled.div`
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: ${props => props.isError ? '#ffebee' : '#e3f2fd'};
  border-radius: 4px;
  color: ${props => props.isError ? '#c62828' : '#0d47a1'};
`;

const SliderContainer = styled.div`
  margin: 1.5rem 0;
`;

const SliderLabel = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #555;
  
  svg {
    margin-right: 0.5rem;
    color: #4a90e2;
  }
`;

const RangeSlider = styled.input`
  width: 100%;
  height: 8px;
  border-radius: 4px;
  -webkit-appearance: none;
  background: #ebebeb;
  outline: none;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #4a90e2;
    cursor: pointer;
  }
  
  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #4a90e2;
    cursor: pointer;
    border: none;
  }
`;

const VolumeValue = styled.span`
  margin-left: 1rem;
  font-size: 0.9rem;
  color: #666;
`;

const PreviewContainer = styled.div`
  margin-top: 1rem;
  padding: 1rem;
  background-color: #f5f5f5;
  border-radius: 8px;
`;

const AudioElement = styled.audio`
  width: 100%;
  margin-top: 0.5rem;
`;

const SoundConverter = () => {
  const [file, setFile] = useState(null);
  const [targetFormat, setTargetFormat] = useState('mp3');
  const [volume, setVolume] = useState(100);
  const [quality, setQuality] = useState('medium');
  const [isConverting, setIsConverting] = useState(false);
  const [conversionResult, setConversionResult] = useState(null);
  const [error, setError] = useState(null);
  const [audioPreview, setAudioPreview] = useState(null);
  
  // 오디오 요소에 대한 참조 추가
  const previewAudioRef = useRef(null);
  const resultAudioRef = useRef(null);
  
  // 지원되는 입력 형식
  const supportedInputFormats = ['mp3', 'wav', 'ogg', 'aac', 'flac'];
  
  // 지원되는 출력 형식
  const supportedOutputFormats = ['mp3', 'wav', 'ogg', 'aac', 'flac'];
  
  // 품질 옵션
  const qualityOptions = [
    { value: 'low', label: '낮음 (파일 크기 작음)' },
    { value: 'medium', label: '중간' },
    { value: 'high', label: '높음' },
    { value: 'best', label: '최고 품질 (파일 크기 큼)' }
  ];
  
  // 파일 선택 핸들러
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    
    // 파일 타입 체크
    const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
    if (!supportedInputFormats.includes(fileExtension)) {
      setError(`지원되지 않는 파일 형식입니다. 지원되는 형식: ${supportedInputFormats.join(', ')}`);
      setFile(null);
      setAudioPreview(null);
      return;
    }
    
    setFile(selectedFile);
    setError(null);
    setConversionResult(null);
    
    // 파일 미리보기 URL 생성
    const previewUrl = URL.createObjectURL(selectedFile);
    setAudioPreview(previewUrl);
  };
  
  // 볼륨 변경 핸들러
  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    
    // 미리보기 오디오에 실시간으로 볼륨 적용
    if (previewAudioRef.current) {
      previewAudioRef.current.volume = newVolume / 100;
    }
    
    // 결과 오디오에도 볼륨 적용
    if (resultAudioRef.current) {
      resultAudioRef.current.volume = newVolume / 100;
    }
  };
  
  // 파일 변환 핸들러
  const handleConvert = async () => {
    if (!file) return;
    
    setIsConverting(true);
    setError(null);
    setConversionResult(null);
    
    try {
      // 서버로 파일 업로드 및 변환 요청
      const formData = new FormData();
      formData.append('file', file);
      formData.append('targetFormat', targetFormat);
      formData.append('volume', volume.toString());
      formData.append('quality', quality);
      
      const response = await fetch(`${BASE_URL}/api/convert`, {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '변환 요청 중 오류가 발생했습니다.');
      }
      
      const conversionData = await response.json();
      
      // 변환 결과 설정
      setConversionResult({
        name: conversionData.convertedName,
        originalName: conversionData.originalName,
        size: conversionData.convertedSize,
        url: `${BASE_URL}${conversionData.convertedUrl}`,
        format: conversionData.format,
        volume: conversionData.volume || volume,
        quality: conversionData.quality || quality,
        volumeDescription: conversionData.volumeDescription
      });
    } catch (err) {
      console.error('변환 오류:', err);
      setError(err.message || '파일 변환 중 오류가 발생했습니다.');
    } finally {
      setIsConverting(false);
    }
  };
  
  // 파일 다운로드 핸들러
  const handleDownload = () => {
    if (!conversionResult || !conversionResult.url) {
      alert('다운로드할 파일이 없습니다.');
      return;
    }
    
    // 새 창에서 직접 다운로드 URL을 열기
    window.open(conversionResult.url, '_blank');
  };
  
  // 컴포넌트 언마운트 시 URL 객체 해제
  useEffect(() => {
    return () => {
      if (audioPreview) {
        URL.revokeObjectURL(audioPreview);
      }
    };
  }, [audioPreview]);
  
  return (
    <ConverterContainer>
      <Title>사운드 포맷 변환기</Title>
      
      <ConverterForm>
        <FormSection>
          <SectionTitle>1. 사운드 파일 선택</SectionTitle>
          <FileInput>
            <HiddenInput 
              type="file" 
              id="sound-file" 
              onChange={handleFileChange}
              accept={supportedInputFormats.map(format => `.${format}`).join(',')}
            />
            <FileInputButton onClick={() => document.getElementById('sound-file').click()}>
              <FaUpload /> 파일 선택하기
            </FileInputButton>
            {file && (
              <FileName>
                선택된 파일: {file.name} ({(file.size / 1024 / 1024).toFixed(2)}MB)
              </FileName>
            )}
          </FileInput>
          
          {audioPreview && (
            <PreviewContainer>
              <p>파일 미리듣기:</p>
              <AudioElement 
                ref={previewAudioRef}
                controls 
                src={audioPreview}
                onLoadedMetadata={() => {
                  if (previewAudioRef.current) {
                    previewAudioRef.current.volume = volume / 100;
                  }
                }}
              />
            </PreviewContainer>
          )}
          
          <SectionTitle>2. 변환 설정</SectionTitle>
          <FormatSelector>
            <InputLabel htmlFor="target-format">출력 형식</InputLabel>
            <Select 
              id="target-format" 
              value={targetFormat}
              onChange={(e) => setTargetFormat(e.target.value)}
              disabled={!file || isConverting}
            >
              {supportedOutputFormats.map(format => (
                <option key={format} value={format}>{format.toUpperCase()}</option>
              ))}
            </Select>
          </FormatSelector>
          
          <FormatSelector>
            <InputLabel htmlFor="quality">출력 품질</InputLabel>
            <Select 
              id="quality" 
              value={quality}
              onChange={(e) => setQuality(e.target.value)}
              disabled={!file || isConverting}
            >
              {qualityOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </Select>
            <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.3rem' }}>
              품질이 높을수록 파일 크기가 커지고 변환 시간이 길어질 수 있습니다.
            </p>
          </FormatSelector>
          
          <SliderContainer>
            <SliderLabel>
              <FaVolumeUp /> 마스터 볼륨
              <VolumeValue>{volume}%</VolumeValue>
            </SliderLabel>
            <RangeSlider
              type="range"
              min="0"
              max="200"
              step="5"
              value={volume}
              onChange={handleVolumeChange}
              disabled={!file || isConverting}
            />
            <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.3rem' }}>
              미리듣기에 볼륨이 즉시 적용됩니다. 변환 시 서버에도 적용됩니다.
            </p>
          </SliderContainer>
          
          <ButtonContainer>
            <Button 
              primary 
              onClick={handleConvert} 
              disabled={!file || isConverting}
            >
              <FaExchangeAlt />
              {isConverting ? '변환 중...' : '파일 변환하기'}
            </Button>
          </ButtonContainer>
        </FormSection>
        
        {conversionResult && (
          <FormSection>
            <SectionTitle>3. 변환 결과</SectionTitle>
            <div>
              <p>원본 파일: {conversionResult.originalName}</p>
              <p>변환된 파일: {conversionResult.name}</p>
              <p>파일 형식: {conversionResult.format.toUpperCase()}</p>
              <p>파일 크기: {(conversionResult.size / 1024 / 1024).toFixed(2)}MB</p>
              <p>출력 품질: {qualityOptions.find(option => option.value === conversionResult.quality)?.label || '중간'}</p>
              <p>
                적용된 볼륨: <strong>{conversionResult.volume}%</strong>
                {conversionResult.volumeDescription && (
                  <span style={{ 
                    color: conversionResult.volumeDescription.includes('주의') ? '#d32f2f' : '#666',
                    marginLeft: '10px', 
                    fontSize: '0.9rem',
                    fontWeight: conversionResult.volumeDescription.includes('주의') ? 'bold' : 'normal'
                  }}>
                    ({conversionResult.volumeDescription})
                  </span>
                )}
              </p>
              
              {conversionResult.url && (
                <PreviewContainer>
                  <p>변환된 파일 미리듣기:</p>
                  <AudioElement 
                    ref={resultAudioRef}
                    controls 
                    src={conversionResult.url}
                    onLoadedMetadata={() => {
                      if (resultAudioRef.current) {
                        resultAudioRef.current.volume = conversionResult.volume / 100;
                      }
                    }}
                  />
                </PreviewContainer>
              )}
              
              <ButtonContainer>
                <Button onClick={handleDownload}>
                  <FaDownload /> 파일 다운로드
                </Button>
              </ButtonContainer>
            </div>
          </FormSection>
        )}
        
        {error && (
          <ConversionInfo isError>{error}</ConversionInfo>
        )}
      </ConverterForm>
      
      <div>
        <h3>지원되는 파일 형식</h3>
        <p>입력: {supportedInputFormats.join(', ').toUpperCase()}</p>
        <p>출력: {supportedOutputFormats.join(', ').toUpperCase()}</p>
        
        <h3>참고사항</h3>
        <p>1. 최대 파일 크기는 100MB입니다.</p>
        <p>2. 변환된 파일은 24시간 동안만 서버에 보관됩니다.</p>
        <p>3. 변환 품질은 선택한 출력 형식에 따라 달라질 수 있습니다.</p>
        <p>4. 마스터 볼륨은 0%~200% 범위 내에서 조절 가능합니다.</p>
        <p>5. 높은 품질로 변환할수록 더 큰 파일 크기와 더 좋은 음질을 얻을 수 있습니다.</p>
      </div>
    </ConverterContainer>
  );
};

export default SoundConverter; 