// pages/index.js

import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { getGitHubRepos } from '../lib/github';

const experiences = [
  {
    role: "Mobile Software Engineer",
    company: "Banco PAN",
    period: "jan de 2024 - o momento · 6 meses",
    location: "São Paulo, Brasil · Remota",
    description: "Desenvolvimento de aplicações móveis.",
    competencies: [],
    logo: "/path/to/banco-pan-logo.png"
  },
  {
    role: "Mobile Developer PL",
    company: "Instituto Conecthus - Tecnologia e Biotecnologia do Amazonas",
    period: "jan de 2022 - nov de 2023 · 1 ano 11 meses",
    location: "Manaus, Amazonas, Brasil · Remota",
    description: "Desenvolvimento de aplicações mobile usando Flutter para criação de interfaces e funcionalidades.",
    competencies: ["Flutter", "Firebase", "mais 4 competências"],
    logo: "/path/to/conecthus-logo.png"
  },
  {
    role: "Mobile Developer",
    company: "Instituto Conecthus - Tecnologia e Biotecnologia do Amazonas",
    period: "ago de 2021 - jan de 2022 · 6 meses",
    location: "Manaus, Amazonas, Brasil · Híbrida",
    description: "Desenvolvimento de aplicações mobile usando Flutter para criação de interfaces e funcionalidades.",
    competencies: ["Mockito", "iOS", "mais 12 competências"],
    logo: "/path/to/conecthus-logo.png"
  },
  {
    role: "Maintenance Technician",
    company: "Oi",
    period: "ago de 2019 - jul de 2021 · 2 anos",
    location: "Manaus, Amazonas, Brasil",
    description: "Acompanhar o time de implantação na instalação de novos equipamentos em Manaus.",
    competencies: ["Revisão de código", "Kotlin", "mais 4 competências"],
    logo: "/path/to/oi-logo.png"
  }
];

export default function Home({ repos }) {
  const defaultImage = 'https://cdn.i-scmp.com/sites/default/files/styles/768x768/public/d8/video/thumbnail/2023/08/21/Clean_0.jpg?itok=Qswnj-td';


  return (
    <div className={styles.container}>
      <Head>
        <title>Matheus Dias - Portfólio</title>
        <meta name="description" content="Portfólio de Matheus Dias" />
        <link rel="icon" href="/favicon.gif" type="image/gif" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.globalText}>Matheus Dias</h1>

        <p className={styles.globalText}>
          Bem-vindo ao meu portfólio! Aqui você encontrará minha trajetória de carreira e projetos executados.
        </p>

        <section className={styles.section}>
          <h2 className={styles.globalText}>Carreira</h2>
          <div className={styles.experienceContainer}>
            {experiences.map((exp, index) => (
              <div key={index} className={styles.experienceCard}>
                <div className={styles.logoContainer}>
                  <Image src={exp.logo} alt={`${exp.company} logo`} width={50} height={50} />
                </div>
                <div className={styles.experienceDetails}>
                  <h3>{exp.role}</h3>
                  <p className={styles.company}>{exp.company}</p>
                  <p className={styles.period}>{exp.period}</p>
                  <p className={styles.location}>{exp.location}</p>
                  <p className={styles.description}>{exp.description}</p>
                  <p className={styles.competencies}>{exp.competencies.join(', ')}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.globalText}>Projetos Executados</h2>
          <div className={styles.grid}>
            {repos.map((repo) => (
              <div key={repo.id} className={styles.card}>
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
                <h3 className={styles.globalText}>
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className={styles.link}>
                    {repo.name}
                  </a>
                </h3>
                <p className={styles.globalText}>{repo.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.section}>
          <h2 className={styles.globalText}>Contatos</h2>
          <p className={styles.globalText}>Email: matheus@example.com</p>
          <p className={styles.globalText}>Telefone: (11) 1234-5678</p>
          <p className={styles.globalText}><a href="https://github.com/Mathvdias" className={styles.link}>GitHub</a></p>
          <p className={styles.globalText}><a href="https://www.linkedin.com/in/matheusvdias/" className={styles.link}>LinkedIn</a></p>
        </section>
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2024 Matheus Dias. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  const repos = await getGitHubRepos('Mathvdias');
  return {
    props: {
      repos,
    },
  };
}

