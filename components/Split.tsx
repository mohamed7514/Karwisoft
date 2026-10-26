import { Fragment, type CSSProperties } from 'react';

// Word-by-word mask reveal; the heading itself gets `.bd-h` and is revealed by <BdMotion />.
export function Split({ text }: { text: string }) {
  const words = text.split(' ');
  return <>{words.map((word, index) => <Fragment key={index}>
    <span className="bd-w"><span style={{ '--i': index } as CSSProperties}>{word}</span></span>
    {index < words.length - 1 ? ' ' : null}
  </Fragment>)}</>;
}
