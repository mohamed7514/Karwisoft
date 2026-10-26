import './styles/styles.css';
import './styles/navigation.css';

export const metadata = { title: 'Karwisoft — 404' };

// Shown for any unmatched URL; both languages, since the URL gives no reliable locale.
export default function GlobalNotFound() {
  return <html lang="fr-CA"><body>
    <main className="wrap" style={{ paddingBlock: '100px' }}>
      <p className="eyebrow">404 / KARWISOFT</p>
      <h1>Cette page est introuvable.</h1>
      <p lang="en" style={{ color: '#6b675e' }}>This page could not be found.</p>
      <p><a className="button dark" href="/">Retour à l’accueil / Back to home ↗</a></p>
    </main>
  </body></html>;
}
