// pages/_document.js

import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="pt-br">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet" />
        <link rel="icon" href="/favicon.gif" type="image/gif" />
        <title>Matheus Vinicius da Silva Dias - Portfólio</title>
        <meta name="description" content="Portfólio de Matheus Vinicius da Silva Dias - Engenheiro de Software e Desenvolvedor Mobile. Experiências em Flutter, Android, e muito mais." />
        <meta name="keywords" content="Matheus Vinicius da Silva Dias, portfólio, engenheiro de software, desenvolvedor mobile, software engineer, flutter, android mobile, projetos de software, experiências profissionais, carreira" />
        <meta name="author" content="Matheus Vinicius da Silva Dias" />
        <meta property="og:title" content="Matheus Vinicius da Silva Dias - Portfólio" />
        <meta property="og:description" content="Portfólio de Matheus Vinicius da Silva Dias - Engenheiro de Software e Desenvolvedor Mobile. Experiências em Flutter, Android, e muito mais." />
        <meta property="og:image" content="https://media.licdn.com/dms/image/C4E03AQGhQW5V0sOxeQ/profile-displayphoto-shrink_200_200/0/1630553066470?e=1723075200&v=beta&t=JiC4voRpPCQ2f54JLKSLrnd4wXHxcZadcaJuV4SOSE0" />
        <meta property="og:url" content="https://matheusvinicius.vercel.app/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="https://media.licdn.com/dms/image/C4E03AQGhQW5V0sOxeQ/profile-displayphoto-shrink_200_200/0/1630553066470?e=1723075200&v=beta&t=JiC4voRpPCQ2f54JLKSLrnd4wXHxcZadcaJuV4SOSE0" />
        <meta name="twitter:title" content="Matheus Vinicius da Silva Dias - Portfólio" />
        <meta name="twitter:description" content="Portfólio de Matheus Vinicius da Silva Dias - Engenheiro de Software e Desenvolvedor Mobile. Experiências em Flutter, Android, e muito mais." />
        <meta name="twitter:image" content="https://media.licdn.com/dms/image/C4E03AQGhQW5V0sOxeQ/profile-displayphoto-shrink_200_200/0/1630553066470?e=1723075200&v=beta&t=JiC4voRpPCQ2f54JLKSLrnd4wXHxcZadcaJuV4SOSE0" />
        <meta name="github:username" content="Mathvdias" />
        <meta name="robots" content="index, follow" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
