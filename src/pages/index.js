// src/pages/index.js
import React, { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import ProjectCard from '../components/ProjectCard'; // Certifique-se de que o caminho está correto
import { experiences } from '../data/experiences';

const Home = ({ initialRepos }) => {
  const [repos, setRepos] = useState(initialRepos || []);
  const [error, setError] = useState(null);
  const defaultImage = 'https://cdn.i-scmp.com/sites/default/files/styles/768x768/public/d8/video/thumbnail/2023/08/21/Clean_0.jpg?itok=Qswnj-td';

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const res = await fetch('/api/github');
        const data = await res.json();
        setRepos(data);
      } catch (err) {
        setError('Erro ao carregar repositórios.');
      }
    };

    if (!initialRepos.length) {
      fetchRepos();
    }
  }, [initialRepos]);

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Matheus Dias</h1>
        <p className={styles.description}>
          Bem-vindo ao meu portfólio! Aqui você encontrará minha trajetória de carreira e projetos executados.
        </p>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Carreira</h2>
          <div className={styles.experienceGrid}>
            {experiences.map((experience, index) => (
              <div key={index} className={styles.experienceCardRight}>
                <div className={styles.experienceCardBody}>
                  <h3 className={styles.experienceCardTitle}>{experience.role}</h3>
                  <p className={styles.experienceCardCompany}>{experience.company}</p>
                  <p className={styles.experienceCardPeriod}>{experience.period}</p>
                  <p className={styles.experienceCardLocation}>{experience.location}</p>
                  <p className={styles.experienceCardDescription}>{experience.description}</p>
                  <div className={styles.experienceCardCompetencies}>
                    {experience.competencies.map((competency, i) => (
                      <span key={i} className={styles.experienceCardCompetency}>{competency}</span>
                    ))}
                  </div>
                </div>
                <Image 
                  src={experience.logo} 
                  alt={`${experience.company} logo`} 
                  width={50} 
                  height={50} 
                  className={styles.experienceCardLogoRight} 
                />
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Projetos Executados</h2>
          {error ? (
            <p>{error}</p>
          ) : (
            repos.map((repo) => (
              <ProjectCard key={repo.id} repo={repo} defaultImage={defaultImage} />
            ))
          )}
        </section>
      </main>
      <footer className={styles.footer}>
        <a href="https://github.com/matheusdias">
          GitHub
        </a>
      </footer>
    </div>
  );
};

export async function getStaticProps() {
  let initialRepos = [];
  try {
    const res = await fetch('https://api.github.com/users/matheusdias/repos');
    initialRepos = await res.json();
  } catch (err) {
    console.error(err);
  }

  return {
    props: {
      initialRepos,
    },
  };
}

export default Home;
