import { useState } from 'react';
import { site } from '../data/portfolioData';
import { asset } from '../lib/assets';

/** Shows public/assets/portrait.png. If it is missing, a neutral silhouette placeholder is shown instead. */
export default function Portrait() {
  const [failed, setFailed] = useState(false);
  return (
    <img
      className="portrait__img"
      src={asset(failed ? 'assets/portrait-placeholder.svg' : site.portrait)}
      alt={failed ? 'Placeholder portrait. Add your photo at public/assets/portrait.png' : `Portrait of ${site.displayName}`}
      width={900}
      height={1100}
      loading="eager"
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
