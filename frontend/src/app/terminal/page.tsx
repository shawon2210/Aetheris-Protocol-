'use client';

import { useState, useRef, useEffect } from 'react';
import { EarthScene } from '@/components/three/EarthScene';
import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';
import { Footer } from '@/components/layout/Footer';
import { api } from '@/lib/api';

interface Line {
  id: string;
  message: string;
  type: 'log' | 'warn' | 'error' | 'success';
}

const TYPE_COLORS: Record<Line['type'], string> = {
  log: 'text-primary/80',
  warn: 'text-[#ffba20]',
  error: 'text-error',
  success: 'text-[#00f0ff]',
};

const TYPE_PREFIX: Record<Line['type'], string> = {
  log: '[>]',
  warn: '[!]',
  error: '[X]',
  success: '[+]',
};

const WELCOME_LINES: Line[] = [
  { id: 'w-1', message: 'NEBULA_OS TERMINAL v1.0.0', type: 'log' },
  { id: 'w-2', message: 'SECURE CONNECTION ESTABLISHED', type: 'success' },
  { id: 'w-3', message: 'TYPE \'HELP\' FOR AVAILABLE COMMANDS', type: 'log' },
  { id: 'w-4', message: '─────────────────────────────────', type: 'log' },
];

export default function TerminalPage() {
  const [lines, setLines] = useState<Line[]>(WELCOME_LINES);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  useEffect(() => {
    const load = async () => {
      try {
        const remoteLines = await api.getTerminalLines();
        if (remoteLines.length > 0) {
          setLines((prev) => [
            ...prev,
            ...remoteLines.map((l) => ({
              id: l.id,
              message: l.message,
              type: l.type as Line['type'],
            })),
          ]);
        }
      } catch {
        // offline — still usable locally
      }
    };
    load();
  }, []);

  const execute = async (cmd: string) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    setLines((prev) => [
      ...prev,
      { id: crypto.randomUUID(), message: `> ${trimmed}`, type: 'log' },
    ]);
    setHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    if (trimmed.toUpperCase() === 'CLEAR') {
      setLines([]);
      setInput('');
      return;
    }

    try {
      const result = await api.executeCommand(trimmed);
      setLines((prev) => [
        ...prev,
        { id: result.id, message: result.message, type: result.type as Line['type'] },
      ]);
    } catch {
      setLines((prev) => [
        ...prev,
        { id: crypto.randomUUID(), message: 'CONNECTION LOST', type: 'error' },
      ]);
    }

    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      execute(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex >= 0) {
        const newIndex = historyIndex + 1;
        if (newIndex >= history.length) {
          setHistoryIndex(-1);
          setInput('');
        } else {
          setHistoryIndex(newIndex);
          setInput(history[newIndex]);
        }
      }
    }
  };

  const handleScreenClick = () => {
    inputRef.current?.focus();
  };

  return (
    <>
      <EarthScene />
      <div className="fixed inset-0 z-[1] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-transparent to-background/70" />
      </div>
      <Header />
      <Sidebar />

      <main className="relative z-10 min-h-screen pl-0 md:pl-32 pt-28 pb-24">
        <div className="max-w-5xl mx-auto px-4 md:px-8 h-[calc(100vh-12rem)]">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-3 h-3 rounded-full bg-error digital-pulse" />
            <h1 className="font-headline-lg text-headline-lg text-white font-bold">
              TERMINAL
            </h1>
            <span className="font-label-mono text-[11px] text-primary/50 tracking-[0.3em] uppercase font-bold ml-auto">
              T-1 Operator Access
            </span>
          </div>

          <div
            onClick={handleScreenClick}
            className="glass-ui rounded-xl p-4 md:p-8 h-full overflow-y-auto cursor-text font-data-readout text-sm md:text-base leading-relaxed"
          >
            {lines.map((line) => (
              <div key={line.id} className={`mb-1 ${TYPE_COLORS[line.type]} whitespace-pre-wrap`}>
                <span className="opacity-50 mr-2">{TYPE_PREFIX[line.type]}</span>
                {line.message}
              </div>
            ))}

            <div className="flex items-center mt-4">
              <span className="text-primary mr-2 opacity-70">$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                className="flex-1 bg-transparent border-none outline-none text-primary caret-primary font-data-readout text-sm md:text-base"
                placeholder="TYPE COMMAND..."
                autoFocus
                spellCheck={false}
                autoComplete="off"
              />
            </div>

            <div ref={bottomRef} />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
