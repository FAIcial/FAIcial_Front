import React, { useEffect, useState } from 'react';
import styles from '../styles/ResultDetailSlideUp.module.css';

interface MetricData {
  imageLeft: string;
  imageRight: string;
  distance: string;
  similarity: number;
}

const metricDataList: MetricData[] = [
  {
    imageLeft: '/assets/eye_left.png',
    imageRight: '/assets/eye_right.png',
    distance: '10px',
    similarity: 22,
  },
  {
    imageLeft: '/assets/nose_left.png',
    imageRight: '/assets/nose_right.png',
    distance: '10px',
    similarity: 34,
  },
  {
    imageLeft: '/assets/mouth_left.png',
    imageRight: '/assets/mouth_right.png',
    distance: '10px',
    similarity: 44,
  },
  {
    imageLeft: '/assets/ear_left.png',
    imageRight: '/assets/ear_right.png',
    distance: '10px',
    similarity: 32,
  },
];

export default function ResultDetailSlideUp({ onClose }: { onClose: () => void }) {
  const [visible, setVisible] = useState(false);
  const [animatedIndices, setAnimatedIndices] = useState<number[]>([]);

  useEffect(() => {
    setVisible(true);
    metricDataList.forEach((_, i) => {
      setTimeout(() => {
        setAnimatedIndices((prev) => [...prev, i]);
      }, i * 400);
    });
  }, []);

  return (
    <div className={`${styles.slideUpContainer} ${visible ? styles.show : ''}`}>
      <div className={styles.slideCard}>
        <button className={styles.closeBtn} onClick={onClose}>X</button>

        {/* X 아래로 왼쪽/오른쪽 라벨 이동 */}
        <div className={styles.headerLabels}>
          <span>왼쪽</span>
          <span>오른쪽</span>
        </div>

        {metricDataList.map((item, i) => (
          <div className={styles.metricRow} key={i}>
            <div className={styles.imageLabels}>
              <img src={item.imageLeft} alt="left" className={styles.faceImage} />
              <span className={styles.dotLine}><span>{item.distance}</span></span>
              <img src={item.imageRight} alt="right" className={styles.faceImage} />
            </div>
            <div className={`${styles.similarity} ${animatedIndices.includes(i) ? styles.animate : ''}`}>
              {item.similarity}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
