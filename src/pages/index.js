import React, { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import Image from 'next/image';
import ProjectCard from '../components/ProjectCard';
import { experiences } from '../data/experiences';
import { getGitHubRepos } from '../lib/github';

const Home = () => {
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState(null);
  const defaultImage = 'https://cdn.i-scmp.com/sites/default/files/styles/768x768/public/d8/video/thumbnail/2023/08/21/Clean_0.jpg?itok=Qswnj-td';

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const repos = await getGitHubRepos('Mathvdias');
        setRepos(repos);
      } catch (err) {
        setError('Erro ao carregar repositórios.');
      }
    };

    fetchRepos();
  }, []);

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
        <p>&copy; {new Date().getFullYear()} Matheus Dias. Todos os direitos reservados.</p>
        <p>
          <a href="https://github.com/Mathvdias" className={styles.link}>GitHub</a> | 
          <a href="https://www.linkedin.com/in/matheusvdias/" className={styles.link}> LinkedIn</a>
        </p>
      </footer>
    </div>
  );
};

export default Home;
