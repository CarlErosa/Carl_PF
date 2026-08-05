'use client';

import { ArrowLeft, Gamepad2, X } from 'lucide-react';
import { useState } from 'react';
import Memory from './games/Memory';
import Pong from './games/Pong';
import Snake from './games/Snake';
import Tetris from './games/Tetris';

const games = [
  {
    id: 'tetris',
    title: 'Tetris',
    description: 'Stack the blocks, clear the lines',
    controls: '← → move · ↑ rotate · space drop',
    accent: '#00d4ff',
    component: Tetris,
  },
  {
    id: 'snake',
    title: 'Snake',
    description: 'Eat the food, grow, survive',
    controls: 'arrow keys to steer',
    accent: '#22c55e',
    component: Snake,
  },
  {
    id: 'pong',
    title: 'Pong',
    description: 'First to 5 against the AI',
    controls: '↑ ↓ move paddle',
    accent: '#f59e0b',
    component: Pong,
  },
  {
    id: 'memory',
    title: 'Memory',
    description: 'Find all the matching pairs',
    controls: 'click to flip',
    accent: '#a855f7',
    component: Memory,
  },
];

export default function GameLauncher() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);

  const game = games.find((g) => g.id === active);
  const ActiveGame = game?.component ?? null;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        title="Retro games"
        aria-label="Open retro games"
        className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors duration-200 hover:bg-surface hover:text-foreground"
      >
        <Gamepad2 size={16} />
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="relative flex max-h-[90vh] w-full max-w-md flex-col overflow-hidden rounded-2xl border border-line bg-background shadow-2xl">
            <div className="flex items-center justify-between border-b border-line px-5 py-3">
              <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-faint-foreground">
                <Gamepad2 size={12} className="text-accent" />
                {game ? (
                  <>
                    retro games
                    <span className="text-line">/</span>
                    <span style={{ color: game.accent }}>{game.title.toLowerCase()}</span>
                  </>
                ) : (
                  'retro games'
                )}
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close games"
                className="p-1 text-muted-foreground transition-colors hover:text-foreground"
              >
                <X size={16} />
              </button>
            </div>

            <div className="overflow-auto p-5">
              {ActiveGame ? (
                <>
                  <button
                    onClick={() => setActive(null)}
                    className="mb-4 inline-flex items-center gap-1 font-mono text-xs text-muted-foreground transition-colors hover:text-accent"
                  >
                    <ArrowLeft size={12} /> all games
                  </button>
                  <ActiveGame />
                </>
              ) : (
                <div className="flex flex-col gap-1.5">
                  {games.map((g) => (
                    <button
                      key={g.id}
                      onClick={() => setActive(g.id)}
                      className="group flex items-center gap-3.5 rounded-xl px-3 py-3.5 text-left transition-colors duration-200 hover:bg-surface"
                    >
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm font-normal text-foreground">{g.title}</span>
                        <span className="mt-0.5 block truncate text-[11px] text-muted-foreground">
                          {g.description}
                        </span>
                      </span>
                      <span
                        className="shrink-0 font-mono text-[9px] uppercase tracking-wider text-faint-foreground"
                      >
                        {g.controls}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
