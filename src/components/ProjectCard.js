// components/ProjectCard.js
import React from 'react';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

const ProjectCard = ({ repo, defaultImage }) => {
  return (
    <div className={styles.card}>
      <div className={styles.mediaWrapper}>
        <Image
          src={repo ? repo.owner.avatar_url : defaultImage}
          alt={repo ? repo.name : 'Default image'}
          width={200}
          height={200}
          className={styles.cardImage}
        />
      </div>
      <h3>{repo ? repo.name : 'Loading...'}</h3>
      <p>{repo ? repo.description : 'Loading...'}</p>
    </div>
  );
};

export default ProjectCard;
