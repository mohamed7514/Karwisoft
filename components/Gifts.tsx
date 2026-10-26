import { getGifts } from '../lib/pricing';
import { promo } from '../lib/i18n/dict';
import type { Locale } from '../lib/i18n/config';

export function Gifts({ locale }: { locale: Locale }) {
  const t = promo[locale];
  return <div className="gifts" role="group" aria-label={t.giftsAria}>
    <p className="gifts-label">{t.includedFree}</p>
    <div className="gifts-grid">
      {getGifts(locale).map(gift => <div className="gift" key={gift.id}>
        <span className="gift-tag">{t.offered}</span>
        <strong>{gift.months}</strong>
        <span className="gift-name">{gift.name}</span>
        <span className="gift-text">{gift.text}</span>
      </div>)}
    </div>
  </div>;
}
