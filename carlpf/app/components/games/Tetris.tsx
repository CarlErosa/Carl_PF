'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

const COLS = 10;
const ROWS = 20;
const CELL = 18;
const W = COLS * CELL;
const H = ROWS * CELL;

type Piece = { matrix: number[][]; color: string };
type Active = Piece & { x: number; y: number };

const PIECES: Piece[] = [
  { matrix: [[1, 1, 1, 1]], color: '#00d4ff' },
  { matrix: [[1, 1], [1, 1]], color: '#f5d400' },
  { matrix: [[0, 1, 0], [1, 1, 1]], color: '#a855f7' },
  { matrix: [[0, 1, 1], [1, 1, 0]], color: '#22c55e' },
  { matrix: [[1, 1, 0], [0, 1, 1]], color: '#ef4444' },
  { matrix: [[1, 0, 0], [1, 1, 1]], color: '#3b82f6' },
  { matrix: [[0, 0, 1], [1, 1, 1]], color: '#f59e0b' },
];

function emptyBoard(): (string | null)[][] {
  return Array.from({ length: ROWS }, () => Array(COLS).fill(null));
}

function rotate(m: number[][]): number[][] {
  return m[0].map((_, i) => m.map((row) => row[i]).reverse());
}

function collides(board: (string | null)[][], p: Active, x: number, y: number): boolean {
  for (let r = 0; r < p.matrix.length; r++) {
    for (let c = 0; c < p.matrix[r].length; c++) {
      if (!p.matrix[r][c]) continue;
      const nx = x + c;
      const ny = y + r;
      if (nx < 0 || nx >= COLS || ny >= ROWS) return true;
      if (ny >= 0 && board[ny][nx]) return true;
    }
  }
  return false;
}

function merge(board: (string | null)[][], p: Active): (string | null)[][] {
  const b = board.map((row) => [...row]);
  for (let r = 0; r < p.matrix.length; r++) {
    for (let c = 0; c < p.matrix[r].length; c++) {
      if (!p.matrix[r][c]) continue;
      const ny = p.y + r;
      const nx = p.x + c;
      if (ny >= 0 && ny < ROWS && nx >= 0 && nx < COLS) b[ny][nx] = p.color;
    }
  }
  return b;
}

function clearLines(board: (string | null)[][]) {
  const remaining = board.filter((row) => row.some((c) => !c));
  const cleared = ROWS - remaining.length;
  const empty = Array.from({ length: cleared }, () => Array(COLS).fill(null));
  return { board: [...empty, ...remaining], cleared };
}

export default function Tetris() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const boardRef = useRef<(string | null)[][]>(emptyBoard());
  const activeRef = useRef<Active | null>(null);
  const scoreRef = useRef(0);
  const overRef = useRef(false);

  const draw = useCallback(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#0b0b0f';
    ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    for (let i = 1; i < COLS; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL, 0);
      ctx.lineTo(i * CELL, H);
      ctx.stroke();
    }
    for (let j = 1; j < ROWS; j++) {
      ctx.beginPath();
      ctx.moveTo(0, j * CELL);
      ctx.lineTo(W, j * CELL);
      ctx.stroke();
    }
    boardRef.current.forEach((row, y) =>
      row.forEach((c, x) => {
        if (c) {
          ctx.fillStyle = c;
          ctx.fillRect(x * CELL + 1, y * CELL + 1, CELL - 2, CELL - 2);
        }
      })
    );
    const p = activeRef.current;
    if (p) {
      p.matrix.forEach((row, r) =>
        row.forEach((v, c) => {
          if (v) {
            ctx.fillStyle = p.color;
            ctx.fillRect((p.x + c) * CELL + 1, (p.y + r) * CELL + 1, CELL - 2, CELL - 2);
          }
        })
      );
    }
  }, []);

  const spawn = useCallback(() => {
    const p = PIECES[Math.floor(Math.random() * PIECES.length)];
    const piece: Active = {
      matrix: p.matrix,
      color: p.color,
      x: Math.floor((COLS - p.matrix[0].length) / 2),
      y: 0,
    };
    if (collides(boardRef.current, piece, piece.x, piece.y)) {
      overRef.current = true;
      setGameOver(true);
      return;
    }
    activeRef.current = piece;
  }, []);

  const step = useCallback(() => {
    if (overRef.current) return;
    const p = activeRef.current;
    if (!p) return;
    if (!collides(boardRef.current, p, p.x, p.y + 1)) {
      p.y += 1;
    } else {
      boardRef.current = merge(boardRef.current, p);
      const result = clearLines(boardRef.current);
      boardRef.current = result.board;
      if (result.cleared) {
        scoreRef.current += result.cleared * 100;
        setScore(scoreRef.current);
      }
      spawn();
    }
    draw();
  }, [draw, spawn]);

  const move = useCallback(
    (dx: number) => {
      const p = activeRef.current;
      if (!p || overRef.current) return;
      if (!collides(boardRef.current, p, p.x + dx, p.y)) {
        p.x += dx;
        draw();
      }
    },
    [draw]
  );

  const rotatePiece = useCallback(() => {
    const p = activeRef.current;
    if (!p || overRef.current) return;
    const m = rotate(p.matrix);
    if (!collides(boardRef.current, { ...p, matrix: m }, p.x, p.y)) {
      p.matrix = m;
      draw();
    }
  }, [draw]);

  const hardDrop = useCallback(() => {
    const p = activeRef.current;
    if (!p || overRef.current) return;
    while (!collides(boardRef.current, p, p.x, p.y + 1)) p.y += 1;
    step();
  }, [step]);

  const reset = useCallback(() => {
    boardRef.current = emptyBoard();
    scoreRef.current = 0;
    setScore(0);
    overRef.current = false;
    setGameOver(false);
    spawn();
    draw();
  }, [draw, spawn]);

  useEffect(() => {
    spawn();
    draw();
    const id = setInterval(step, 450);
    return () => clearInterval(id);
  }, [spawn, draw, step]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (overRef.current) return;
      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault();
          move(-1);
          break;
        case 'ArrowRight':
          e.preventDefault();
          move(1);
          break;
        case 'ArrowDown':
          e.preventDefault();
          step();
          break;
        case 'ArrowUp':
          e.preventDefault();
          rotatePiece();
          break;
        case ' ':
          e.preventDefault();
          hardDrop();
          break;
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [move, step, rotatePiece, hardDrop]);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex w-full items-center justify-between font-mono text-xs text-muted-foreground">
        <span>score</span>
        <span>{score}</span>
      </div>
      <canvas
        ref={canvasRef}
        width={W}
        height={H}
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
