'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { localizeHref, parsePath, type Locale } from '../lib/i18n/config';
import { shell } from '../lib/i18n/dict';
import { useEffect, useId, useRef, useState } from 'react';

export function SiteNavigation({ services = false, locale = 'fr' }: { services?: boolean; locale?: Locale }) {
  const t = shell[locale];
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuId = useId();
  const container = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1001px)');
    const closeOnDesktop = () => {
      if (desktop.matches) setOpen(false);
    };
    desktop.addEventListener('change', closeOnDesktop);
    return () => desktop.removeEventListener('change', closeOnDesktop);
  }, []);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape') return;
      event.preventDefault();
      setOpen(false);
      toggle.current?.focus();
    }

    function onPointerDown(event: PointerEvent) {
      if (event.target instanceof Node && !container.current?.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [open]);

  const close = () => setOpen(false);

  return <div className="site-navigation" ref={container}>
    <button
      ref={toggle}
      className="site-menu-toggle"
      type="button"
      aria-expanded={open}
      aria-controls={menuId}
      onClick={() => setOpen(value => !value)}
    >
      {open ? t.close : t.menu}
      <span className="site-menu-icon" aria-hidden="true"><span /><span /></span>
    </button>
    <nav id={menuId} className="site-menu" aria-label={t.nav} data-open={open}>
      <div className="site-menu-links">
        <Link className="services-link" href={localizeHref('/services/', locale)} aria-current={parsePath(pathname).path.startsWith('/services') ? 'page' : undefined} onClick={close}>{t.services}</Link>
        <Link href={localizeHref('/tarifs/', locale)} aria-current={parsePath(pathname).path.startsWith('/tarifs') ? 'page' : undefined} onClick={close}>{t.pricing}</Link>
        <Link href={localizeHref('/a-propos/', locale)} aria-current={parsePath(pathname).path.startsWith('/a-propos') ? 'page' : undefined} onClick={close}>{t.about}</Link>
        <Link href={localizeHref('/contact/', locale)} aria-current={parsePath(pathname).path.startsWith('/contact') ? 'page' : undefined} onClick={close}>{t.contact}</Link>
      </div>
      <div className="site-menu-actions">
        {locale === 'fr' && <a className="presentation-link" href="/?mode=presentation#intro-1" title={t.presentationTitle} onClick={close}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><rect x="3" y="3" width="18" height="13" rx="2" /><path d="m8 21 4-5 4 5M9 8l6 3-6 3V8Z" /></svg>
          <span>{t.presentation}</span>
        </a>}
        <a className="site-contact" href={localizeHref('/contact/', locale)} onClick={close}>{t.contactCta} <span aria-hidden="true">↗</span></a>
      </div>
    </nav>
  </div>;
}
