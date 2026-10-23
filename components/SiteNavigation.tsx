'use client';

import Link from 'next/link';
import { useEffect, useId, useRef, useState } from 'react';

export function SiteNavigation() {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const container = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 761px)');
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
      {open ? 'Fermer' : 'Menu'}
      <span className="site-menu-icon" aria-hidden="true"><span /><span /></span>
    </button>
    <nav id={menuId} className="site-menu" aria-label="Navigation principale" data-open={open}>
      <Link className="services-link" href="/services/" onClick={close}>Services</Link>
      <a href="#parcours" onClick={close}>Le parcours</a>
      <a className="presentation-link" href="?mode=presentation#accueil" onClick={close}>Présenter <span aria-hidden="true">↗</span></a>
      <a className="nav-offer" href="#offre" onClick={close}>L’offre <span aria-hidden="true">↗</span></a>
    </nav>
  </div>;
}
