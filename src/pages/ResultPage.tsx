// ResultPage.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/ResultPage.module.css';
import ResultDetailSlideUp from '../components/ResultDetailSlideUp';

export default function ResultPage() {
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [showDetail, setShowDetail] = useState(false); // ✅ 슬라이드업 상태

  useEffect(() => {
    const storedImage = localStorage.getItem('FAIcialImage');
    if (storedImage) {
      setImageSrc(storedImage);
    }
  }, []);

  const handleRetry = () => {
    localStorage.removeItem('FAIcialImage');
    navigate('/main');
  };

  const handleDownload = () => {
    if (!imageSrc) return;
    const link = document.createElement('a');
    link.href = imageSrc;
    link.download = 'FAIcial_result.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    const shareData = {
      title: 'FAIcial 결과',
      text: 'AI가 분석한 내 얼굴 대칭 결과를 확인해보세요!',
      url: window.location.href,
    };

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile && navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error('모바일 공유 실패:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareData.url);
        alert('📎 공유 링크가 복사되었어요!\n분석 결과를 친구들에게 공유 해보세요 😊');
      } catch (err) {
        alert('링크 복사에 실패했어요 😢');
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.cardBox}>
          <img src="/assets/FAIcial_logo.png" alt="FAIcial Logo" className={styles.logo} />
          <h1 className={styles.title}>분석이 끝났어요! 결과를 확인해보세요!</h1>

          <div className={styles.resultBox}>
            {imageSrc ? (
              <img
                src={imageSrc}
                alt="AI 분석 결과 이미지"
                className={styles.resultImage}
              />
            ) : (
              <p>이미지를 불러올 수 없습니다.</p>
            )}
          </div>

          <p className={styles.summary}>멋져요! AI가 인정한 대칭 얼굴입니다 😎</p>

          <button
            className={styles.highlightButton}
            onClick={() => setShowDetail(true)}
          >
            분석 자세히 보기
          </button>

          <div className={styles.resultActions}>
            <button className={styles.actionBtn} onClick={handleRetry}>다시하기</button>
            <button className={styles.actionBtn} onClick={handleDownload}>저장하기</button>
            <button className={styles.actionBtn} onClick={handleShare}>공유하기</button>
          </div>
        </div>
      </div>

      {/* ✅ 슬라이드업 표시 */}
      {showDetail && (
        <ResultDetailSlideUp onClose={() => setShowDetail(false)} />
      )}
    </div>
  );
}
