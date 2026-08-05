'use client';

import { useCallback, useState } from 'react';

const SYMBOLS = ['◆', '▲', '●', '■', '★', '✦', '✚', '✶'];
const COLORS = ['#ef4444', '#f59e0b', '#22c55e', '#3b82f6', '#a855f7', '#ec4899', '#14b8a6', '#eab308'];

type Card = { id: number; symbol: string; color: string };

function buildDeck(): Card[] {
  const cards: Card[] = [];
  SYMBOLS.forEach((s, i) => {
    cards.push({ id: i * 2, symbol: s, color: COLORS[i] });
    cards.push({ id: i * 2 + 1, symbol: s, color: COLORS[i] });
  });
  for (let i = cards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [cards[i], cards[j]] = [cards[j], cards[i]];
  }
  return cards;
}

export default function Memory() {
  const [deck, setDeck] = useState<Card[]>(buildDeck);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);

  const handleClick = useCallback(
    (card: Card) => {
      if (flipped.length === 2 || flipped.includes(card.id) || matched.includes(card.id)) return;
      const next = [...flipped, card.id];
      setFlipped(next);
      if (next.length === 2) {
        setMoves((m) => m + 1);
        const [a, b] = next.map((id) => deck.find((c) => c.id === id)!);
        if (a.symbol === b.symbol) {
          setMatched((m) => [...m, a.id, b.id]);
          setFlipped([]);
        } else {
          setTimeout(() => setFlipped([]), 700);
        }
      }
    },
    [deck, flipped, matched]
  );

  const reset = () => {
    setDeck(buildDeck());
    setFlipped([]);
    setMatched([]);
    setMoves(0);
  };

  const won = matched.length === deck.length;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex w-full items-center justify-between font-mono text-xs text-muted-foreground">
        <span>moves</span>
        <span>{moves}</span>
      </div>
      <div className="grid w-full grid-cols-4 gap-2">
        {deck.map((card) => {
          const isUp = flipped.includes(card.id) || matched.includes(card.id);
          return (
            <button
              key={card.id}
              onClick={() => handleClick(card)}
              className={`flex aspect-square items-center justify-center rounded-lg border text-xl transition-colors ${
                isUp
                  ? matched.includes(card.id)
                    ? 'border-accent bg-surface'
                    : 'border-line bg-surface'
                  : 'border-line bg-background hover:border-muted-foreground'
              }`}
            >
              {isUp ? (
                <span style={{ color: card.color }}>{card.symbol}</span>
              ) : (
                <span className="font-mono text-xs text-faint-foreground">?</span>
              )}
            </button>
          );
        })}
      </div>
      {won && <p className="font-mono text-xs text-emerald-500">you won in {moves} moves</p>}
      <button
        onClick={reset}
        className="rounded-lg border border-line px-4 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        restart
      </button>
    </div>
  );
}
