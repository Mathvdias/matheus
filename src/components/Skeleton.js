// components/Skeleton.js
import React from 'react';
import styles from '../styles/Home.module.css';

const Skeleton = () => {
  return (
    <div className={styles.skeletonWrapper}>
      <div className={styles.card}></div>
    </div>
  );
};

export default Skeleton;
