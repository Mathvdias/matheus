import Head from 'next/head';
import { useEffect, useState } from 'react';
import styles from '../styles/Home.module.css';
import { experiences } from '../data/experiences';
import ProjectCard from '../components/ProjectCard';
import { getGitHubRepos } from '../lib/github';

const Home = ({ initialRepos }) => {
  const [repos, setRepos] = useState(initialRepos);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const repos = await getGitHubRepos();
        setRepos(repos);
      } catch (error) {
        setError('Erro ao carregar repositórios.');
      }
    };

    if (!initialRepos.length) {
      fetchRepos();
    }
  }, [initialRepos]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Matheus Dias - Portfólio</title>
        <meta name="description" content="Portfólio de Matheus Dias" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Matheus Dias</h1>
        <p className={styles.description}>
          Bem-vindo ao meu portfólio! Aqui você encontrará minha trajetória de carreira e projetos executados.
        </p>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Carreira</h2>
          <div className={styles.experienceGrid}>
            {experiences.map((experience) => (
              <div key={experience.role} className={styles.experienceCardRight}>
                <div className={styles.experienceCardBody}>
                  <h3 className={styles.experienceCardTitle}>{experience.role}</h3>
                  <p className={styles.experienceCardCompany}>{experience.company}</p>
                  <p className={styles.experienceCardPeriod}>{experience.period}</p>
                  <p className={styles.experienceCardLocation}>{experience.location}</p>
                  <p className={styles.experienceCardDescription}>{experience.description}</p>
                  <div className={styles.experienceCardCompetencies}>
                    {experience.competencies.map((competency) => (
                      <span key={competency} className={styles.experienceCardCompetency}>
                        {competency}
                      </span>
                    ))}
                  </div>
                </div>
                <img src={experience.logo} alt={`${experience.company} logo`} className={styles.experienceCardLogoRight} />
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Projetos Executados</h2>
          <div className={styles.grid}>
            {error ? (
              <p>{error}</p>
            ) : (
              repos.map((repo) => (
                <ProjectCard key={repo.id} repo={repo} defaultImage="https://cdn.i-scmp.com/sites/default/files/styles/768x768/public/d8/video/thumbnail/2023/08/21/Clean_0.jpg?itok=Qswnj-td" />
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export async function getStaticProps() {
  const initialRepos = await getGitHubRepos();
  return {
    props: {
      initialRepos,
    },
    revalidate: 3600,
  };
}

export default Home;
