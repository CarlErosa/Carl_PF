'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const SIZE = 20;
const CELL = 14;

export default function Snake() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const snakeRef = useRef([{ x: 10, y: 10 }]);
  const dirRef = useRef({ x: 1, y: 0 });
  const foodRef = useRef({ x: 15, y: 10 });
  const scoreRef = useRef(0);
  const overRef = useRef(false);

  const placeFood = useCallback(() => {
    const snake = snakeRef.current;
    let p: { x: number; y: number };
    do {
      p = { x: Math.floor(Math.random() * SIZE), y: Math.floor(Math.random() * SIZE) };
    } while (snake.some((s) => s.x === p.x && s.y === p.y));
    foodRef.current = p;
  }, []);

  const draw = useCallback(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#0b0b0f';
    ctx.fillRect(0, 0, SIZE * CELL, SIZE * CELL);
    ctx.fillStyle = '#ef4444';
    ctx.fillRect(foodRef.current.x * CELL, foodRef.current.y * CELL, CELL - 1, CELL - 1);
    snakeRef.current.forEach((s, i) => {
      ctx.fillStyle = i === 0 ? '#4ade80' : '#16a34a';
      ctx.fillRect(s.x * CELL, s.y * CELL, CELL - 1, CELL - 1);
    });
  }, []);

  const reset = useCallback(() => {
    snakeRef.current = [{ x: 10, y: 10 }];
    dirRef.current = { x: 1, y: 0 };
    scoreRef.current = 0;
    setScore(0);
    overRef.current = false;
    setGameOver(false);
    placeFood();
    draw();
  }, [placeFood, draw]);

  useEffect(() => {
    draw();
    const id = setInterval(() => {
      if (overRef.current) return;
      const snake = snakeRef.current;
      const head = {
        x: snake[0].x + dirRef.current.x,
        y: snake[0].y + dirRef.current.y,
      };
      if (
        head.x < 0 ||
        head.y < 0 ||
        head.x >= SIZE ||
        head.y >= SIZE ||
        snake.some((s) => s.x === head.x && s.y === head.y)
      ) {
        overRef.current = true;
        setGameOver(true);
        return;
      }
      snake.unshift(head);
      if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
        scoreRef.current += 10;
        setScore(scoreRef.current);
        placeFood();
      } else {
        snake.pop();
      }
      draw();
    }, 100);
    return () => clearInterval(id);
  }, [draw, placeFood]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (overRef.current) return;
      const dirs: Record<string, { x: number; y: number }> = {
        ArrowUp: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 },
      };
      const d = dirs[e.key];
      if (d) {
        e.preventDefault();
        if (d.x !== -dirRef.current.x || d.y !== -dirRef.current.y) dirRef.current = d;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex w-full items-center justify-between font-mono text-xs text-muted-foreground">
        <span>score</span>
        <span>{score}</span>
      </div>
      <canvas
        ref={canvasRef}
        width={SIZE * CELL}
        height={SIZE * CELL}
        className="rounded-lg border border-line bg-[#0b0b0f]"
      />
      {gameOver && <p className="font-mono text-xs text-red-500">game over</p>}
      <button
        onClick={reset}
        className="rounded-lg border border-line px-4 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        restart
      </button>
    </div>
  );
}
