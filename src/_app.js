// pages/_app.js
import '@fontsource/inter/400.css'; // Peso 400 (normal)
import '@fontsource/inter/600.css'; // Peso 600 (semibold)
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
