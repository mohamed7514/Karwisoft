const paths: Record<string, string> = {
  search: 'M23 14a9 9 0 1 1-18 0 9 9 0 0 1 18 0z M21 21l8 8',
  lock: 'M8 14h16v15H8z M11 14V8a5 5 0 0 1 10 0v6 M16 20v4',
  content: 'M7 3h10l4 4v22H7z M17 3v6h6 M11 14h6 M11 19h6 M11 24h4',
  links: 'M12 20l8-8 M10 17l-2 2a5 5 0 0 0 7 7l4-4a5 5 0 0 0 0-7 M22 15l2-2a5 5 0 0 0-7-7l-4 4a5 5 0 0 0 0 7',
  authority: 'M4 24l8-8 6 4 10-14 M20 6h8v8 M4 29h24',
  technical: 'M11 8L3 16l8 8 M21 8l8 8-8 8 M18 4l-4 24',
  local: 'M25 13c0 7-9 16-9 16S7 20 7 13a9 9 0 0 1 18 0z M19 13a3 3 0 1 1-6 0 3 3 0 0 1 6 0',
  analytics: 'M5 4v24h24 M10 22v-7 M17 22V9 M24 22V4',
};

export function SeoMethodIcon({ kind }: { kind: string }) {
  return <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[kind] ?? paths.content} /></svg>;
}
