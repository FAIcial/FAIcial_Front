// MainPage.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/MainPage.module.css';

export default function MainPage() {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const imageUrl = URL.createObjectURL(file);
      const img = new Image();
      img.src = imageUrl;
      img.onload = () => {
        setPreviewImage(imageUrl);
      };
    }
  };

  const handleStartAnalysis = () => {
    if (!previewImage) return;
    setLoading(true);

    // 이미지 저장
    localStorage.setItem('FAIcialImage', previewImage);

    const flipInterval = setInterval(() => {
      setFlipped(prev => !prev);
    }, 500);

    setTimeout(() => {
      clearInterval(flipInterval);
      setFlipped(false);
      setLoading(false);
      navigate('/result');
    }, 6000);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.cardBox}>
        <img src="/assets/FAIcial_logo.png" alt="FAIcial Logo" className={styles.logo} />
        <h1 className={styles.title}>이미지 업로드</h1>

        <div className={styles.previewBox}>
          {previewImage ? (
            <img
              src={previewImage}
              alt="preview"
              className={`${styles.previewImage} ${flipped ? styles.flipped : ''}`}
            />
          ) : (
            <p className={styles.notice}>
              정면 사진이 아니면 측정결과가<br />정확하지 않을 수 있습니다.
            </p>
          )}
        </div>

        {!loading && (
          <div className={styles.selectButtons}>
            <button onClick={() => document.getElementById('fileAlbum')?.click()}>사진 선택</button>
            <input
              type="file"
              accept="image/*"
              id="fileAlbum"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
          </div>
        )}

        {loading && (
          <>
            <div className={styles.loaderBar}>
              <div className={styles.progressLoader} />
            </div>
            <p className={styles.loadingText}>
              조금만 기다려주세요!<br />AI가 얼굴 대칭을 분석 중입니다 …
            </p>
          </>
        )}

        {!loading && (
          <button
            className={styles.uploadButton}
            onClick={handleStartAnalysis}
            disabled={!previewImage}
          >
            분석 시작
          </button>
        )}
      </div>
    </div>
  );
}
