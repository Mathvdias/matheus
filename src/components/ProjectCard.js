import React from 'react';
import Image from 'next/image';
import styles from '../styles/ProjectCard.module.css';

const ProjectCard = ({ repo, defaultImage }) => {
  return (
    <div className={styles.card}>
      {repo.readmeImage ? (
        <div className={styles.mediaWrapper}>
          <Image
            src={repo.readmeImage}
            alt={`${repo.name} image`}
            className={styles.cardImage}
            layout="responsive"
            width={250}
            height={250}
            priority
          />
        </div>
      ) : repo.readmeVideo ? (
        <div className={styles.mediaWrapper}>
          <video
            src={repo.readmeVideo}
            controls
            className={styles.cardVideo}
            width="250"
            height="250"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      ) : (
        <div className={styles.mediaWrapper}>
          <Image
            src={defaultImage}
            alt={repo.name}
            className={styles.cardImage}
            layout="responsive"
            width={250}
            height={250}
            priority
          />
        </div>
      )}
      <h3 className={styles.cardTitle}>
        <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className={styles.link}>
          {repo.name}
        </a>
      </h3>
      <p className={styles.cardDescription}>{repo.description}</p>
    </div>
  );
};

export default ProjectCard;
