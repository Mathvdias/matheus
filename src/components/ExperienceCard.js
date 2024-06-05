// components/ExperienceCard.js
import React from 'react';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

const ExperienceCard = ({ experience }) => {
  return (
    <div className={styles.experienceCard}>
      <div className={styles.logoContainer}>
        <Image
          src={experience.logo}
          alt={`${experience.company} logo`}
          width={50}
          height={50}
          className={styles.experienceCardLogo}
        />
      </div>
      <div className={styles.experienceDetails}>
        <h3>{experience.role}</h3>
        <p className={styles.company}>{experience.company}</p>
        <p className={styles.period}>{experience.period}</p>
        <p className={styles.location}>{experience.location}</p>
        <p className={styles.description}>{experience.description}</p>
        <div className={styles.competencies}>
          {experience.competencies.map((comp, index) => (
            <span key={index} className={styles.experienceCardCompetency}>
              {comp}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperienceCard;
