'use client';

import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';
import { SEO_QUICK_COUNT, SEO_QUICK_DURATION_MS } from '../lib/seo-five-minute';
import { isSeoSignalId, isPyramidCorrect, type SeoSignalId } from '../lib/seo-pyramid';

type Progress = { answers: readonly number[]; elapsedMs: number; placements: readonly (SeoSignalId | null)[]; pyramidChecked: boolean };
const emptyProgress = (): Progress => ({ answers: [], elapsedMs: 0, placements: Array(SEO_QUICK_COUNT).fill(null), pyramidChecked: false });
const progressComplete = (progress: Progress) => progress.answers.length === SEO_QUICK_COUNT && progress.pyramidChecked && isPyramidCorrect(progress.placements);

type LearningState = Progress & {
  ready: boolean;
  started: boolean;
  complete: boolean;
  percentage: number;
  start: () => void;
  answer: (index: number, choice: number) => void;
  placeSignal: (id: SeoSignalId, slot: number) => void;
  checkPyramid: () => void;
  clearPyramid: () => void;
  reset: () => void;
};
const LearningContext = createContext<LearningState | null>(null);

export function SeoLearningProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState<Progress>(emptyProgress);
  const [ready, setReady] = useState(false);
  const [started, setStarted] = useState(false);
  const complete = progressComplete(progress);
  const percentage = Math.round((progress.answers.length + (complete ? 1 : 0)) / (SEO_QUICK_COUNT + 1) * 100);
  const expired = progress.elapsedMs >= SEO_QUICK_DURATION_MS;

  useEffect(() => {
    // Retire only this lesson's old snapshots. Progress now lives in React state.
    for (const key of ['karwisoft:seo-learning:v1', 'karwisoft:seo-learning:v2', 'karwisoft:seo-learning:v3']) {
      try { localStorage.removeItem(key); } catch { /* Storage may be unavailable. */ }
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!started || !ready || complete || expired) return;
    let lastTick = performance.now();
    let wasVisible = document.visibilityState === 'visible';
    function tick() {
      const now = performance.now();
      const delta = wasVisible ? now - lastTick : 0;
      lastTick = now;
      wasVisible = document.visibilityState === 'visible';
      if (delta <= 0) return;
      setProgress(previous => progressComplete(previous) ? previous : { ...previous, elapsedMs: Math.min(SEO_QUICK_DURATION_MS, previous.elapsedMs + delta) });
    }
    const interval = window.setInterval(tick, 1000);
    document.addEventListener('visibilitychange', tick);
    return () => { clearInterval(interval); document.removeEventListener('visibilitychange', tick); };
  }, [started, ready, complete, expired]);

  const start = useCallback(() => { if (ready) setStarted(true); }, [ready]);
  const answer = useCallback((index: number, choice: number) => {
    if (!ready || !started || !Number.isInteger(choice) || choice < 0 || choice > 2) return;
    setProgress(previous => index === previous.answers.length && index < SEO_QUICK_COUNT ? { ...previous, answers: [...previous.answers, choice] } : previous);
  }, [ready, started]);
  const placeSignal = useCallback((id: SeoSignalId, slot: number) => {
    if (!ready || !started || !isSeoSignalId(id) || !Number.isInteger(slot) || slot < 0 || slot >= SEO_QUICK_COUNT) return;
    setProgress(previous => {
      if (previous.answers.length !== SEO_QUICK_COUNT || progressComplete(previous) || previous.placements[slot] === id) return previous;
      const placements = [...previous.placements];
      const source = placements.indexOf(id);
      if (source >= 0) placements[source] = placements[slot];
      placements[slot] = id;
      return { ...previous, placements, pyramidChecked: false };
    });
  }, [ready, started]);
  const checkPyramid = useCallback(() => {
    if (!ready || !started) return;
    setProgress(previous => previous.answers.length === SEO_QUICK_COUNT && previous.placements.every(Boolean) ? { ...previous, pyramidChecked: true } : previous);
  }, [ready, started]);
  const clearPyramid = useCallback(() => {
    if (!ready || !started) return;
    setProgress(previous => progressComplete(previous) ? previous : { ...previous, placements: Array(SEO_QUICK_COUNT).fill(null), pyramidChecked: false });
  }, [ready, started]);
  const reset = useCallback(() => { setStarted(false); setProgress(emptyProgress()); }, []);

  return <LearningContext.Provider value={{ ...progress, ready, started, complete, percentage, start, answer, placeSignal, checkPyramid, clearPyramid, reset }}>{children}</LearningContext.Provider>;
}

export function useSeoLearning() {
  const context = useContext(LearningContext);
  if (!context) throw new Error('SEO learning requires its provider');
  return context;
}

export function SeoLearningCompletion({ children }: { children: ReactNode }) {
  const { complete } = useSeoLearning();
  return complete ? <>{children}</> : null;
}
